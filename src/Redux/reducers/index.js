import { combineReducers } from 'redux';
import recipleSearch from './recipleSearch';
import user from './user';
import searchClicked from './searchClicked';
import filteredClicked from './filteredClicked';

const rootReducer = combineReducers({
  user,
  recipleSearch,
  searchClicked,
  filteredClicked,
});

export default rootReducer;
