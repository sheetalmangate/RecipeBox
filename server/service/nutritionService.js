import dotenv from "dotenv";
dotenv.config();
class NutritionService {
  constructor(ingredients) {
    this.baseURL = process.env.NUTRITION_BASE_URL || "";
    this.apiKey = process.env.NUTRITION_KEY || "";
    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": this.apiKey,
      },
      body: JSON.stringify({ ingredients }),
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
