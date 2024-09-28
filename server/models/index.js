import sequelize from "../config/connection.js";
import { UserFactory } from "../models/user.js";
import { RecipeFactory } from "../models/recipe.js";
import { NutritionFactory } from "../models/nutrition.js";

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Nutrition = NutritionFactory(sequelize);

User.belongsToMany(Recipe, { through: "userrecipes" });
Recipe.belongsToMany(User, { through: "userrecipes" });
Recipe.hasOne(Nutrition);
Nutrition.belongsTo(Recipe);

export { User, Recipe, Nutrition };
