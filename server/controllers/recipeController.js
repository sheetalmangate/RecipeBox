import { Recipe,User } from "../models/index.js";
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

export const searchRecipes = async (req, res) => {
  const { title } = req.params;
  const recipeService = new RecipeService(title);
  try {
    const data = await recipeService.fetchRecipeData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeByHash = async (req, res) => {
  try {
    const { unique_hash } = req.params;
    const recipe = await Recipe.findOne({
      where: { unique_hash: unique_hash },
    });
    if (recipe) {
      res.json(email);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const { title, ingredients, servings, instructions } = req.body;
  const unique_hash = "";

  try {
    const newRecipe = await Recipe.create({
      unique_hash,
      title,
      ingredients,
      servings,
      instructions,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, servings, instructions } = req.body;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      recipe.title = title;
      recipe.ingredients = ingredients;
      recipe.servings = servings;
      recipe.instructions = instructions;
      // recipe.unique_hash = crypto
      //   .createHash("sha256")
      //   .update(title + ingredients + servings + instructions)
      //   .digest("hex");
      await recipe.save();
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const shareRecipe = async (req, res) => {
  const { id, user_id } = req.params;
  try {
    // const recipe = await Recipe.findByPk(id);
    // const user = await User.findByPk(user_id);
    const recipe = {title: "test", servings: 4, ingredients: "test", instructions: "test"};
    const user = {email: "test@test.com", username: "test"};
    if (recipe && user) {
        const info = await transporter.sendMail({
          from: `${user.email}`, // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Check out this recipe ------", // Subject line
          text: "Hello world?", // plain text body
          html: `<h1>${recipe.title}</h1>
          <p>Serves: ${recipe.servings}</p>
          <p>Ingredients: ${recipe.ingredients}</p>
          <p>Instructions: ${recipe.instructions}</p>
          <p>From: ${user.username}</p>
          `
          , // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Recipe shared" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

