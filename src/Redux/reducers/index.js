import { combineReducers } from 'redux';
import foodSearch from './foodsSearch';
import user from './user';
import searchClicked from './searchClicked';
import filteredClicked from './filteredClicked';

const rootReducer = combineReducers({ user, foodSearch, searchClicked, filteredClicked });

export default rootReducer;
