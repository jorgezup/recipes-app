import { combineReducers } from 'redux';
import recipleSearch from './recipleSearch';
import user from './user';
import searchClicked from './searchClicked';

const rootReducer = combineReducers({
  user,
  recipleSearch,
  searchClicked,
});

export default rootReducer;
