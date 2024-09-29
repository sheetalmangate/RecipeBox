import dotenv from "dotenv";
dotenv.config();

class RecipeService {
  constructor() {
    this.baseURL = process.env.RECIPE_BASE_URL || "";
    this.apiKey = process.env.RECIPE_KEY || "";
    this.options = {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
    };
  }

  buildRecipeQuery() {
    return `${this.baseURL}?key=${this.apiKey}`;
  }
}
