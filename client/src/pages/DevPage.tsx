import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { saveRecipe, searchRecipes } from "../api/recipeAPI";
import { searchNutrition } from "../api/nutritionAPI";
import { RecipeData } from "../interfaces/RecipeData";
import { NutritionData } from "../interfaces/NutritionData";
// import { UserData } from "../interfaces/UserData";
// import { retrieveUsers } from "../api/userAPI";
import auth from "../utils/auth";
import LoginProps from "../interfaces/LoginProps";

const DevTest = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      if (recipeTitle) {
        try {
          const recipes: RecipeData[] = await searchRecipes(recipeTitle);
          const ingredients = recipes[0].ingredients || "";
          const myRecipe = await saveRecipe({
            title: recipes[0].title,
            ingredients: recipes[0].ingredients,
            servings: recipes[0].servings,
            instructions: recipes[0].instructions,
          });
          console.log("myrecipe", myRecipe);
          const nutrition: NutritionData = await searchNutrition(
            ingredients,
            recipes[0].servings || "",
          );

          console.log("nutrition", nutrition);
          // navigate("/");
        } catch (err) {
          setErrorMessage("Recipe title is required.");
          // console.error('Failed to create ticket:', err);
        }
      }
    } else {
      setLoggedIn(false);
      navigate("/login");
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRecipeTitle(value);
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Search Recipes</h1>
          <label htmlFor="tTitle">Recipe Title</label>
          <textarea
            id="tTitle"
            name="title"
            value={recipeTitle || ""}
            onChange={handleTitleChange}
          />
          <p className="error">{errorMessage}</p>
          <button type="submit" onSubmit={handleSubmit}>
            Submit Form
          </button>
        </form>
      </div>
    </>
  );
};

export default DevTest;
