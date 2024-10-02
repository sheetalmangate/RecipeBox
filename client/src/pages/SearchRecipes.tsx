import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { searchRecipes } from "../api/recipeAPI";
import { RecipeData } from "../interfaces/RecipeData";
import auth from "../utils/auth";
import LoginProps from "../interfaces/LoginProps";
import "bootstrap/dist/css/bootstrap.min.css";
import { searchNutrition } from "../api/nutritionAPI";
import NutritionShowData from "../components/NutritionShowData";

const SearchRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState<RecipeData[]>([]); // State to store search results
  const [nutritionData, setNutritionData] = useState<{ [key: number]: any }>(
    {},
  );
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      if (recipeTitle) {
        try {
          const recipes = await searchRecipes(recipeTitle);
          setSearchResults(recipes); // Store search results
          console.log("recipes", recipes);
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

  const handleSaveRecipe = async (recipe: RecipeData) => {
    // Implement save functionality here
    console.log("Saving recipe:", recipe);
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      if (recipeTitle) {
        try {
          // const recipes = await addRecipe(recipeTitle);
          // Store search results
          console.log("recipe", recipe);
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
    try {
      const nutrition = await searchNutrition(ingredients, servings);
      setNutritionData((prevData) => ({ ...prevData, [index]: nutrition }));
    } catch (err) {
      console.log("Failed to get nutrition data", err);
      setErrorMessage("Failed to get nutrition data");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form className="form pt-3 pb-3" onSubmit={handleSubmit}>
          {/* <h1>Search Recipes</h1> */}
          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="tTitle" className="form-label">
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
                rows={1} // Set rows to 1 to make it smaller
                style={{ height: "38px" }}
              />
            </div>
          </div>
          <p className="text-danger">{errorMessage}</p>
          <button type="submit" className="btn btn-primary">
            Search Recipes
          </button>
        </form>
        <div className="search-results mt-5">
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((recipe, index) => (
                <div className="col-12 mb-4" key={index}>
                  <div className="card h-100 d-flex flex-column">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title text-center">{recipe.title}</h3>
                      <p className="card-text">
                        <strong>Ingredients:</strong> {recipe.ingredients}
                      </p>
                      <p className="card-text">
                        <strong>Servings:</strong> {recipe.servings}
                      </p>
                      <p className="card-text">
                        <strong>Instructions:</strong> {recipe.instructions}
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-success"
                          onClick={() => handleSaveRecipe(recipe)}
                        >
                          Add to Recipe Box
                        </button>

                        <button
                          className="btn btn-success"
                          onClick={() => {
                            if (recipe.ingredients && recipe.servings) {
                              handleShowNutrition(
                                recipe.ingredients,
                                recipe.servings,
                                index,
                              );
                            } else {
                              setErrorMessage(
                                "Ingredients and servings are required to show nutrition data.",
                              );
                            }
                          }}
                        >
                          {nutritionData[index]
                            ? "Hide Nutrition"
                            : "Show Nutrition"}
                        </button>
                      </div>
                      {nutritionData[index] && (
                        <NutritionShowData data={nutritionData[index]} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recipes found {recipeTitle && ` for "${recipeTitle}"`}.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRecipe;
