import dotenv from "dotenv";
dotenv.config();

class RecipeService {
  constructor(title) {
    this.baseURL = process.env.RECIPE_BASE_URL || "";
    this.apiKey = process.env.RECIPE_KEY || "";
    this.params = new URLSearchParams({
      query: title,
    });
    this.options = {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
    };
  }

  buildRecipeQuery() {
    return `${this.baseURL}?${this.params}`;
  }

  async fetchRecipeData(title) {
    try {
      const response = await fetch(this.buildRecipeQuery(title), this.options);
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

export default RecipeService;
