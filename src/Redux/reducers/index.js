import { combineReducers } from 'redux';
import recipeSearch from './recipeSearch';
import user from './user';
import searchClicked from './searchClicked';

const rootReducer = combineReducers({
  user,
  recipeSearch,
  searchClicked,
});

export default rootReducer;
