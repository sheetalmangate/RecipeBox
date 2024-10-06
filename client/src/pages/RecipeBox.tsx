import { useState, useEffect } from "react";
import { retrieveRecipes } from "../api/recipeAPI"; // Import the retrieveRecipes function
import RecipeCard from "../components/RecipeShowData";
import { searchNutrition } from "../api/nutritionAPI";
// import { RecipeData } from "../interfaces/RecipeData";
import LoginProps from "../interfaces/LoginProps";
import auth from "../utils/auth";
import { useNavigate, useOutletContext } from "react-router-dom";

// Adjust the import based on your actual API file
const useRecipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await retrieveRecipes();
        setRecipes(data);
      } catch (error) {
        setErrorMessage("Failed to fetch recipes");
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, errorMessage };
};

const RecipeBox = () => {
  const [nutritionData, setNutritionData] = useState<{ [key: number]: any }>(
    {},
  );
  const { loggedIn, setLoggedIn }: LoginProps = useOutletContext();
  const navigate = useNavigate();
  let recipes: any[] = [];
  let errorMessage: string | null = null;

  useEffect(() => {
    // make sure user is still logged in (i.e. token is still valid)
    if (!auth.loggedIn()) {
      setLoggedIn(false);
      navigate("/login");
    }
  }, []);

  if (loggedIn) {
    const data = useRecipes();
    recipes = data.recipes;
    errorMessage = data.errorMessage;
  }

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
    <div className="container mt-5">
      <h2
        style={{
          color: "#FFD1DC",
          fontStyle: "italic",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Welcome back to your Recipe Box! Ready to cook up something delicious?
      </h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              index={index}
              nutritionData={nutritionData}
              handleShowNutrition={handleShowNutrition}
              showSaveButton={false} // Hide the save button
              setErrorMessage={(message) => console.error(message)}
            />
          ))}
        </div>
      ) : (
        <p>No recipes found in your recipe box.</p>
      )}
    </div>
  );
};

export default RecipeBox;
