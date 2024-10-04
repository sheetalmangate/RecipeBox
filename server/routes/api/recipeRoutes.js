import { Router } from "express";
import {
  searchRecipes,
  retrieveRecipes,
  saveRecipe,
  shareRecipe,
} from "../../controllers/recipeController.js";

const router = Router();

// GET /recipes/search - Search for recipes by title
router.get("/search/:title", searchRecipes);
// GET /recipes - Retrieve recipes for a user
router.get("/", retrieveRecipes);
// POST /recipes - Save a new recipe
router.post("/", saveRecipe);
// POST /recipes/share - Share a recipe
router.post("/share", shareRecipe);

export { router as recipeRouter };
