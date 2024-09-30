import { Recipe } from "../models/recipe.js";
import RecipeService from "../service/recipeService.js";
import crypto from "crypto";

export const searchRecipes = async (req, res) => {
  const { title } = req.params;
  const recipeService = new RecipeService(title);
  try {
    const data = await recipeService.fetchRecipeData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeByHash = async (req, res) => {
  try {
    const { unique_hash } = req.params;
    const recipe = await Recipe.findOne({
      where: { unique_hash: unique_hash },
    });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const { title, ingredients, servings, instructions } = req.body;
  const unique_hash = "";

  try {
    const newRecipe = await Recipe.create({
      unique_hash,
      title,
      ingredients,
      servings,
      instructions,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, servings, instructions } = req.body;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      recipe.title = title;
      recipe.ingredients = ingredients;
      recipe.servings = servings;
      recipe.instructions = instructions;
      // recipe.unique_hash = crypto
      //   .createHash("sha256")
      //   .update(title + ingredients + servings + instructions)
      //   .digest("hex");
      await recipe.save();
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
