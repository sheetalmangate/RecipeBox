import { DataTypes, Model } from "sequelize";
import crypto from "crypto";

export class Recipe extends Model {
  // Hash the title, ingredients, servings, and instructions to prevent duplicate recipes
  setUniqueHash() {
    const hash = crypto.createHash("sha256");
    hash.update(this.title);
    hash.update(this.ingredients);
    hash.update(this.servings);
    hash.update(this.instructions);
    this.unique_hash = hash.digest("hex");
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
      hooks: {
        beforeCreate: (recipe) => {
          recipe.setUniqueHash();
        },
        beforeUpdate: (recipe) => {
          recipe.setUniqueHash();
        },
      },
    },
  );
  return Recipe;
}
