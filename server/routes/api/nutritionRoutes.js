import { Router } from "express";

import {
  getNutritionByRecipeId,
  saveNutrition,
  searchNutrition,
} from "../../controllers/nutritionController.js";

const router = Router();

// GET /nutrition/:id - Get a nutrition by recipe id
router.get("/:id", getNutritionByRecipeId);
// POST /nutrition - Save a new nutrition
router.post("/", saveNutrition);
// GET /nutrition/search - Search for recipes by title
// router.get("/search/:ingredients", searchNutrition);
router.post("/search", searchNutrition);

export { router as nutritionRouter };
