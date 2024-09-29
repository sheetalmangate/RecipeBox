import { Router } from "express";
import {
  getAllRecipes,
  getRecipeById,
  getRecipeByHash,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../controllers/recipeController.js";

const router = Router();

// GET /recipes - Get all recipes
router.get("/", getAllRecipes);
// GET /recipes/:id - Get a recipe by id
router.get("/:id", getRecipeById);
// GET /recipes/hash/:unique_hash - Get a recipe by unique_hash
router.get("/hash/:unique_hash", getRecipeByHash);
// POST /recipes - Create a new recipe
router.post("/", createRecipe);
// PUT /recipes/:id - Update a recipe by id
router.put("/:id", updateRecipe);
// DELETE /recipes/:id - Delete a recipe by id
router.delete("/:id", deleteRecipe);

export { router as recipeRouter };