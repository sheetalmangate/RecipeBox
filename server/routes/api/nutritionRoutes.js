import { Router } from "express";

import {
  getNutritionByRecipeId,
  createNutrition,
  searchNutrition,
} from "../../controllers/nutritionController.js";

const router = Router();

// GET /nutrition/:id - Get a nutrition by recipe id
router.get("/:id", getNutritionByRecipeId);
// POST /nutrition - Create a new nutrition
router.post("/", createNutrition);
// GET /nutrition/search - Search for recipes by title
router.get("/search/:ingredients", searchNutrition);

export { router as nutritionRouter };
