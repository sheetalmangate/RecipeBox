import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";
import RecipeService from "../service/recipeService.js";
import crypto from "crypto";

function getUniqueHash(title, ingredients, servings, instructions) {
  const hash = crypto.createHash("sha256");
  hash.update(title);
  hash.update(ingredients);
  hash.update(servings);
  hash.update(instructions);
  return hash.digest("hex");
}

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

export const saveRecipe = async (req, res) => {
  const { title, ingredients, servings, instructions } = req.body;
  const { id } = req.user;
  // console.log("id", id);
  const unique_hash = getUniqueHash(title, ingredients, servings, instructions);
  const recipe = await Recipe.findOne({
    where: { unique_hash: unique_hash },
  });
  const myuser = await User.findByPk(id); // Find the user by id

  if (recipe) {
    myuser.addRecipe(recipe); // Add the recipe to the user's recipes
    return res.status(201).json(recipe);
  } else {
    try {
      const newRecipe = await Recipe.create({
        unique_hash,
        title,
        ingredients,
        servings,
        instructions,
      });
      myuser.addRecipe(newRecipe); // Add the recipe to the user's recipes
      res.status(201).json(newRecipe);
    } catch (error) {
      // console.log(error);
      res.status(400).json({ message: error.message });
    }
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
