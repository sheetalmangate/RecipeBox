import { RecipeData } from "../interfaces/RecipeData";
import { ApiMessage } from "../interfaces/ApiMessage";
import Auth from "../utils/auth";

const searchRecipes = async (title: string): Promise<RecipeData[]> => {
  try {
    const response = await fetch(`/api/recipes/search/${title}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

const saveRecipe = async (body: RecipeData) => {
  try {
    const response = await fetch("/api/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from Recipe Creation: ", err);
    return Promise.reject("Could not create recipe");
  }
};

const retrieveRecipes = async () => {
  try {
    const response = await fetch("/api/recipes/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

const retrieveRecipe = async (id: number | null): Promise<RecipeData> => {
  try {
    const response = await fetch(`/api/recipes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return Promise.reject("Could not fetch singular recipe");
  }
};

const updateRecipe = async (
  recipeId: number,
  body: RecipeData,
): Promise<RecipeData> => {
  try {
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.error("Update did not work", err);
    return Promise.reject("Update did not work");
  }
};

const deleteRecipe = async (recipeId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.error("Error in deleting recipe", err);
    return Promise.reject("Could not delete recipe");
  }
};

export {
  searchRecipes,
  saveRecipe,
  deleteRecipe,
  retrieveRecipes,
  retrieveRecipe,
  updateRecipe,
};
