import { combineReducers } from 'redux';
import recipeSearch from './recipeSearch';
import user from './user';
import searchClicked from './searchClicked';
import filteredClicked from './filteredClicked';

const rootReducer = combineReducers({
  user,
  recipeSearch,
  searchClicked,
  filteredClicked,
});

export default rootReducer;
