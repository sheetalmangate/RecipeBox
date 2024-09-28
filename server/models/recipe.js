import { DataTypes, Model } from "sequelize";

export class Recipe extends Model {
  constructor(title, ingredients, servings, instructions) {
    this.title = title;
    this.ingredients = ingredients;
    this.servings = servings;
    this.instructions = instructions;
  }
}

export function RecipeFactory(sequelize) {
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      unique_hash: {
        // bcrypt hash of the title, ingredients, servings, and instructions to prevent duplicate recipes
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      servings: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "recipes",
      sequelize,
    },
  );
  return Recipe;
}
