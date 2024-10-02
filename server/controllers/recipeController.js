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
  const { id } = req.user;
  // Find the user by id
  const user = await User.findByPk(id);
  const recipeService = new RecipeService(title);

  try {
    const recipes = await recipeService.fetchRecipeData();
    // Check if each recipe is already saved by the user
    for (let i = 0; i < recipes.length; i++) {
      // Initialize the saved flag to false
      recipes[i].saved = false;
      // Get the unique hash for the recipe
      const unique_hash = getUniqueHash(
        recipes[i].title,
        recipes[i].ingredients,
        recipes[i].servings,
        recipes[i].instructions,
      );
      // Check if the recipe is already in the database
      const recipe = await Recipe.findOne({
        where: { unique_hash: unique_hash },
      });
      // If the user has already saved the recipe, set the saved flag to true
      if (await user.hasRecipe(recipe)) {
        recipes[i].saved = true;
      }
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const retrieveRecipes = async (req, res) => {
  const { id } = req.user;
  // Find the user by id
  const user = await User.findByPk(id);

  try {
    // Get all the recipes for the user
    const recipes = await user.getRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveRecipe = async (req, res) => {
  const { title, ingredients, servings, instructions } = req.body;
  const { id } = req.user;
  // Get the unique hash for the recipe
  const unique_hash = getUniqueHash(title, ingredients, servings, instructions);
  // Find the user by id
  const user = await User.findByPk(id);

  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: { unique_hash: unique_hash },
      defaults: {
        title: title,
        ingredients: ingredients,
        servings: servings,
        instructions: instructions,
      },
    });
    // Add the recipe to the user's recipes
    user.addRecipe(recipe);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // }
};
