import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      },
    );

// import { UserFactory } from "../models/user.js";
// import { RecipeFactory } from "../models/recipe.js";
// import { NutritionFactory } from "../models/nutrition.js";

// const User = UserFactory(sequelize);
// const Recipe = RecipeFactory(sequelize);
// const Nutrition = NutritionFactory(sequelize);

// User.belongsToMany(Recipe, { through: "userrecipes" });
// Recipe.belongsToMany(User, { through: "userrecipes" });
// Recipe.hasOne(Nutrition);
// Nutrition.belongsTo(Recipe);

// export { sequelize, User, Recipe, Nutrition };

export default sequelize;
