import { Router } from "express";
import {
  searchRecipes,
  getAllRecipes,
  getRecipeById,
  getRecipeByHash,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  shareRecipe,
  // createRecipe,
} from "../../controllers/recipeController.js";

const router = Router();

// GET /recipes/search - Search for recipes by title
router.get("/search/:title", searchRecipes);
// GET /recipes - Get all recipes
router.get("/", getAllRecipes);
// GET /recipes/:id - Get a recipe by id
router.get("/:id", getRecipeById);
// GET /recipes/hash/:unique_hash - Get a recipe by unique_hash
router.get("/hash/:unique_hash", getRecipeByHash);
// POST /recipes - Create a new recipe
// router.post("/", createRecipe);
// POST /recipes/share - Share a recipe
router.post("/share/:id", shareRecipe);
// POST /recipes - Save a new recipe
router.post("/", saveRecipe);
// PUT /recipes/:id - Update a recipe by id
router.put("/:id", updateRecipe);
// DELETE /recipes/:id - Delete a recipe by id
router.delete("/:id", deleteRecipe);

export { router as recipeRouter };
