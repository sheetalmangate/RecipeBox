import { Nutrition } from "../models/nutrition.js";
import NutritionService from "../service/nutritionService.js";

export const getNutritionByRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Nutrition.findOne({
      where: { recipe_id: id },
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

export const saveNutrition = async (req, res) => {
  const {
    servings,
    dietlabels,
    cautions,
    calories,
    fat,
    carbohydrates,
    fiber,
    sugar,
    protein,
    cholesterol,
  } = req.body;
  const unique_hash = "";

  try {
    const newRecipe = await Nutrition.create({
      servings,
      dietlabels,
      cautions,
      calories,
      fat,
      carbohydrates,
      fiber,
      sugar,
      protein,
      cholesterol,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const searchNutrition = async (req, res) => {
  //   const { ingredients } = req.params;
  const { ingredients } = req.body;

  const nutritionService = new NutritionService(ingredients);
  try {
    const data = await nutritionService.fetchNutritionData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
