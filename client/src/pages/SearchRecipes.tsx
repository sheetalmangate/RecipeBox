import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { searchRecipes } from "../api/recipeAPI";
import { RecipeData } from "../interfaces/RecipeData";
import auth from "../utils/auth";
import LoginProps from "../interfaces/LoginProps";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState<RecipeData[]>([]); // State to store search results
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
              {searchResults.map((recipe) => (
                <div className="col-md-4 mb-4" key={recipe.id}>
                  <div className="card h-100 d-flex flex-column">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title">{recipe.title}</h3>
                      <p className="card-text">
                        <strong>Ingredients:</strong> {recipe.ingredients}
                      </p>
                      <p className="card-text">
                        <strong>Servings:</strong> {recipe.servings}
                      </p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-success"
                          onClick={() => handleSaveRecipe(recipe)}
                        >
                          Add to Recipe Box
                        </button>
                      </div>
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
