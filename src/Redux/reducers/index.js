import { combineReducers } from 'redux';
import recipeSearch from './recipeSearch';
import user from './user';
import searchClicked from './searchClicked';
import byIngredientsFood from './byIngredientsFood';
import byIngredientsDrink from './byIngredientsDrink';

const rootReducer = combineReducers({
  user,
  recipeSearch,
  searchClicked,
  byIngredientsFood,
  byIngredientsDrink,
});

export default rootReducer;
