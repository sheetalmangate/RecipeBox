export interface NutritionData {
  // id: number | null;
  servings: number | null;
  dietlabels: string | null;
  cautions: string | null;
  calories: number | null;
  fat: number | null;
  carbohydrates: number | null;
  fiber: number | null;
  sugar: number | null;
  protein: number | null;
  cholesterol: number | null;
}

// example IngredientObject:
// {
//   ingredients: [
//     '3 1/2 c Chicken broth',
//     '1 lb Fresh spinach',
//     '1 Egg',
//     '1 c Grated parmesan cheese',
//     '1 c Romano cheese',
//     'Salt and pepper'
//   ]
// }
