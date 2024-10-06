import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { searchRecipes, saveRecipe } from "../api/recipeAPI";
import { searchNutrition } from "../api/nutritionAPI";
import { RecipeData } from "../interfaces/RecipeData";
import auth from "../utils/auth";
import LoginProps from "../interfaces/LoginProps";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeCard from "../components/RecipeShowData";

const SearchRecipes = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState<RecipeData[]>([]);
  const [nutritionData, setNutritionData] = useState<{ [key: number]: any }>(
    {},
  );
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  useEffect(() => {
    if (!auth.loggedIn()) {
      setLoggedIn(false);
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (auth.loggedIn()) {
      if (recipeTitle) {
        try {
          const recipes = await searchRecipes(recipeTitle);
          setSearchResults(recipes);
        } catch (err) {
          setErrorMessage("Recipe title is required.");
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

  const handleSaveRecipe = async (recipe: RecipeData, index: number) => {
    // Implement save functionality here
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      if (recipeTitle) {
        try {
          await saveRecipe(recipe);
          recipe.saved = true;

          // Store search results
          // console.log("recipe saved", data);
          // Update the recipe's saved state
          setSearchResults((prevResults) =>
            prevResults.map((r, i) =>
              i === index ? { ...r, saved: true } : r,
            ),
          );
        } catch (err) {
          setErrorMessage("Recipe title is required.");
        }
      }
    } else {
      setLoggedIn(false);
      navigate("/login");
    }
  };

  const handleShowNutrition = async (
    ingredients: string,
    servings: string,
    index: number,
  ) => {
    if (nutritionData[index]) {
      setNutritionData((prevData) => {
        const newData = { ...prevData };
        delete newData[index];
        return newData;
      });
    } else {
      try {
        const nutrition = await searchNutrition(ingredients, servings);
        setNutritionData((prevData) => ({
          ...prevData,
          [index]: nutrition,
        }));
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      }
    }
  };

  return (
    <div className="container trasnparent-bg mt-5">
      <form className="form pt-3 pb-3 text-center" onSubmit={handleSubmit}>
        <div className="row mb-3 justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="tTitle" className="form-label fw-bold text-light">
              Recipe Title
            </label>
          </div>
          <div className="col">
            <textarea
              id="tTitle"
              name="title"
              className="form-control"
              value={recipeTitle || ""}
              onChange={handleTitleChange}
              rows={1}
              style={{ height: "38px" }}
            />
          </div>
        </div>
        <p className="text-danger">{errorMessage}</p>
        <button type="submit" className="btn-recipe w-auto ">
          Search Recipes
        </button>
      </form>
      <div className="search-results mt-5 text-light text-center">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <div className="row d-flex justify-content-center">
            {searchResults.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                index={index}
                nutritionData={nutritionData}
                handleShowNutrition={handleShowNutrition}
                handleSaveRecipe={handleSaveRecipe}
                showSaveButton={true}
                setErrorMessage={setErrorMessage}
              />
            ))}
          </div>
        ) : (
          <p>No recipes found {recipeTitle && ` for "${recipeTitle}"`}.</p>
        )}
      </div>
    </div>
  );
};

export default SearchRecipes;
