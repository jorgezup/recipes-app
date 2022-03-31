import { combineReducers } from 'redux';
import recipeSearch from './recipeSearch';
import user from './user';
import searchClicked from './searchClicked';
import byIngredientsFood from './byIngredientsFood';
import byIngredientsDrink from './byIngredientsDrink';
import meals from './meals';
import mealsCategories from './mealsCategories';
import mealById from './mealById';
import drinks from './drinks';
import drinksCategories from './drinksCategories';
import drinkById from './drinkById';

const rootReducer = combineReducers({
  user,
  recipeSearch,
  searchClicked,
  byIngredientsFood,
  byIngredientsDrink,
  meals,
  mealsCategories,
  mealById,
  drinks,
  drinksCategories,
  drinkById,
});

export default rootReducer;
