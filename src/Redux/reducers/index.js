import { combineReducers } from 'redux';
import foodSearch from './foodsSearch';

const rootReducer = combineReducers({
  foodSearch,
});

export default rootReducer;
