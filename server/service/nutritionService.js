import dotenv from "dotenv";
dotenv.config();

// example ingredientsObject:
// {
//   ingredients: [
//     '3 1/2 c Chicken broth',
//     '1 lb Fresh spinach',
//     '1 Egg',
//     '1 c Grated parmesan cheese',
//     '1 c Romano cheese',
//     'Salt and pepper'
//   ]
// }

class NutritionService {
  constructor(ingredientsObject) {
    this.baseURL = process.env.NUTRITION_BASE_URL || "";
    this.apiKey = process.env.NUTRITION_KEY || "";
    this.options = {
      headers: {
        Method: "POST",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": this.apiKey,
      },
      body: JSON.stringify(ingredientsObject),
    };
  }

  async fetchNutritionData() {
    try {
      const response = await fetch(this.baseURL, this.options);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("Recipe not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default NutritionService;
