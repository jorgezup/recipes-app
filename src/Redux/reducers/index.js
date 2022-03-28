import { combineReducers } from 'redux';
import foodSearch from './foodsSearch';
import user from './user';

const rootReducer = combineReducers({ user, foodSearch });

export default rootReducer;
