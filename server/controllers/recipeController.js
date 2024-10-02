import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";
import RecipeService from "../service/recipeService.js";
import NutritionService from "../service/nutritionService.js";
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
  const unique_hash = getUniqueHash(title, ingredients, servings, instructions);

  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: { unique_hash: unique_hash },
      defaults: {
        // unique_hash: unique_hash,
        title: title,
        ingredients: ingredients,
        servings: servings,
        instructions: instructions,
      },
    });

    // Find the user by id
    const myuser = await User.findByPk(id);
    // Add the recipe to the user's recipes
    myuser.addRecipe(recipe);

    res.status(201).json(recipe);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
  // }
};
