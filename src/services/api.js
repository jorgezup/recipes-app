export const fetchMealsApi = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinksApi = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchMealsCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinksCategory = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchMealById = async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinkById = async (drinkId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
  const { drinks } = await response.json();
  return drinks;
};
