import { DataTypes, Model } from "sequelize";

export class Nutrition extends Model {}

export function NutritionFactory(sequelize) {
  Nutrition.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      servings: {
        // this comes from recipe and will divide the nutrition values by the servings
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      dietlabels: {
        // DietLabels: ['Low-Carb']
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      cautions: {
        // Cautions: ['Sulfites']
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      calories: {
        // ENERC_KCAL: { label: 'Energy', quantity: 1955.33, unit: 'kcal' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      fat: {
        // FAT: { label: 'Total lipid (fat)', quantity: 139.0, unit: 'g' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      carbohydrates: {
        // CHOCDF: { label: 'Carbohydrate, by difference', quantity: 42.94, unit: 'g' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      fiber: {
        // FIBTG: { label: 'Fiber, total dietary', quantity: 3.54, unit: 'g' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      sugar: {
        // SUGAR: { label: 'Sugars, total including NLEA', quantity: 3.0, unit: 'g' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      protein: {
        // PROCNT: { label: 'Protein', quantity: 138.0, unit: 'g' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      cholesterol: {
        // CHOLE: { label: 'Cholesterol', quantity: 0.0, unit: 'mg' }
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "nutrition",
      sequelize,
    },
  );
  return Nutrition;
}
