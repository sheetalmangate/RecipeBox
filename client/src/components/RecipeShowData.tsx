import { RecipeData } from "../interfaces/RecipeData";
import NutritionShowData from "./NutritionShowData";

interface RecipeCard {
  recipe: RecipeData;
  index: number;
  nutritionData: { [key: number]: any };
  handleShowNutrition: (
    ingredients: string,
    servings: string,
    index: number,
  ) => void;
  handleSaveRecipe?: (recipe: RecipeData, index: number) => void; // Optional prop for saving recipe
  showSaveButton?: boolean; // Optional prop to control the visibility of the save button
  setErrorMessage: (message: string) => void;
}

const RecipeCard = ({
  recipe,
  index,
  nutritionData,
  handleShowNutrition,
  handleSaveRecipe,
  showSaveButton = true, // Default to true
  setErrorMessage,
}: RecipeCard) => {
  return (
    <div className="col-12 mb-4">
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
              className="btn btn-primary"
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
              {nutritionData[index] ? "Hide Nutrition" : "Show Nutrition"}
            </button>
            {showSaveButton && handleSaveRecipe && (
              <button
                className="btn btn-success"
                onClick={() => handleSaveRecipe(recipe, index)}
                disabled={recipe.saved} // Disable button if recipe is already saved
              >
                {recipe.saved ? "Saved to Recipe Box" : "Add to My Recipe Box"}
              </button>
            )}
          </div>
          {nutritionData[index] && (
            <NutritionShowData data={nutritionData[index]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
