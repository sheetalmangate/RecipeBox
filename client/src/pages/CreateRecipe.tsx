import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { saveRecipe } from "../api/recipeAPI";
import { RecipeData } from "../interfaces/RecipeData";
import auth from "../utils/auth";
import LoginProps from "../interfaces/LoginProps";

const CreateRecipe = () => {
  const [newRecipe, setNewRecipe] = useState<RecipeData | undefined>({
    title: "",
    ingredients: "",
    servings: "",
    instructions: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  useEffect(() => {
    // make sure user is still logged in (i.e. token is still valid)
    if (!auth.loggedIn()) {
      setLoggedIn(false);
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      if (newRecipe) {
        try {
          await saveRecipe(newRecipe);
          navigate("/");
        } catch (err) {
          setErrorMessage("All fields are required.");
          // console.error('Failed to create ticket:', err);
        }
      }
    } else {
      setLoggedIn(false);
      navigate("/login");
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleServingChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  // const handleUserChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setNewRecipe((prev) => (prev ? { ...prev, [name]: value } : undefined));
  // };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Recipe</h1>
          <label htmlFor="tTitle">Recipe Title</label>
          <textarea
            id="tTitle"
            name="title"
            value={newRecipe?.title || ""}
            onChange={handleTextAreaChange}
          />
          <label htmlFor="tIngredients">Recipe Ingredients</label>
          <textarea
            name="ingredients"
            id="tIngredients"
            value={newRecipe?.ingredients || ""}
            onChange={handleTextAreaChange}
          ></textarea>
          <label htmlFor="tServings">Recipe Servings</label>
          {/* <textarea
            name="servings"
            id="tServings"
            value={newRecipe?.servings || ""}
            onChange={handleTextAreaChange}
          /> */}
          <select
            name="servings"
            id="tServings"
            value={newRecipe?.servings || ""}
            onChange={handleServingChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <label htmlFor="tInstructions">Recipe Instructions</label>
          <textarea
            id="tInstructions"
            name="instructions"
            value={newRecipe?.instructions || ""}
            onChange={handleTextAreaChange}
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

export default CreateRecipe;
