import { NutritionData } from "../interfaces/NutritionData";
// import { ApiMessage } from "../interfaces/ApiMessage";
import Auth from "../utils/auth";

const formatNutritionData = (data: any, servings: number): NutritionData => {
  if (data) {
    const nutritionData: NutritionData = {
      servings: servings,
      dietlabels: data.dietLabels,
      cautions: data.cautions,
      calories: data.calories,
      fat: data.totalNutrients.FAT.quantity,
      carbohydrates: data.totalNutrients.CHOCDF.quantity,
      fiber: data.totalNutrients.FIBTG.quantity,
      sugar: data.totalNutrients.SUGAR.quantity,
      protein: data.totalNutrients.PROCNT.quantity,
      cholesterol: data.totalNutrients.CHOLE.quantity,
    };
    return nutritionData;
  } else {
    return {
      servings: 0,
      dietlabels: "",
      cautions: "",
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0,
      protein: 0,
      cholesterol: 0,
    };
  }
};

const createIngredientList = (ingredients: string) => {
  if (!ingredients) return [];
  const ingredientList = ingredients.split("|");
  for (let i = 0; i < ingredientList.length; i++) {
    ingredientList[i] = ingredientList[i].split(";")[0];
  }
  return ingredientList;
};

const searchNutrition = async (
  ingredientsStr: string,
  servingsStr: string,
): Promise<NutritionData> => {
  const ingredients = createIngredientList(ingredientsStr);
  try {
    const response = await fetch("/api/nutrition/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify({ ingredients }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }
    // convert servings to number
    const servingsArr = servingsStr.match(/\d+/);
    const servings = servingsArr ? parseInt(servingsArr[0], 10) : 1;

    return formatNutritionData(data, servings);
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return {
      servings: 0,
      dietlabels: "",
      cautions: "",
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0,
      protein: 0,
      cholesterol: 0,
    };
  }
};

export { searchNutrition };
