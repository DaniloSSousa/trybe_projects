import { combineReducers } from 'redux';
import data from './reducerData';
import filters from './reducerFilters';

const rootReducer = combineReducers({ data, filters });

export default rootReducer;
