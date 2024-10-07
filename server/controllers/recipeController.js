import { Recipe, User } from "../models/index.js";
import RecipeService from "../service/recipeService.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "deon47@ethereal.email",
    pass: "KanXCdQ5pypcskxrG8",
  },
});

function getUniqueHash(title, ingredients, servings, instructions) {
  const hash = crypto.createHash("sha256");
  hash.update(title);
  hash.update(ingredients);
  hash.update(servings);
  hash.update(instructions);
  return hash.digest("hex");
}

export const searchRecipes = async (req, res) => {
  const { title } = req.params;
  const { id } = req.user;
  // Find the user by id
  const user = await User.findByPk(id);
  const recipeService = new RecipeService(title);

  try {
    const recipes = await recipeService.fetchRecipeData();
    // Check if each recipe is already saved by the user
    for (let i = 0; i < recipes.length; i++) {
      // Initialize the saved flag to false
      recipes[i].saved = false;
      // Get the unique hash for the recipe
      const unique_hash = getUniqueHash(
        recipes[i].title,
        recipes[i].ingredients,
        recipes[i].servings,
        recipes[i].instructions,
      );
      // Check if the recipe is already in the database
      const recipe = await Recipe.findOne({
        where: { unique_hash: unique_hash },
      });
      // If the user has already saved the recipe, set the saved flag to true
      if (await user.hasRecipe(recipe)) {
        recipes[i].saved = true;
      }
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const retrieveRecipes = async (req, res) => {
  const { id } = req.user;
  // Find the user by id
  const user = await User.findByPk(id);

  try {
    // Get all the recipes for the user
    const recipes = await user.getRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveRecipe = async (req, res) => {
  const { title, ingredients, servings, instructions } = req.body;
  const { id } = req.user;
  // Get the unique hash for the recipe
  const unique_hash = getUniqueHash(title, ingredients, servings, instructions);
  // Find the user by id
  const user = await User.findByPk(id);

  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: { unique_hash: unique_hash },
      defaults: {
        title: title,
        ingredients: ingredients,
        servings: servings,
        instructions: instructions,
      },
    });
    // Add the recipe to the user's recipes
    user.addRecipe(recipe);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // }
};
export const shareRecipe = async (req, res) => {
  try {
    const { title, servings, ingredients, instructions } = req.body;
    const { user } = req;
    // const recipe = {title: "test", servings: 4, ingredients: "test", instructions: "test"};
    // const user = {email: "test@test.com", username: "test"};
    if (user) {
      const info = await transporter.sendMail({
        from: `${user.email}`, // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Check out this recipe ------", // Subject line
        text: "Hello world?", // plain text body
        html: `<h1>${title}</h1>
          <p>Serves: ${servings}</p>
          <p>Ingredients: ${ingredients}</p>
          <p>Instructions: ${instructions}</p>
          <p>From: ${user.username}</p>
          `, // html body
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Recipe shared" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
