import { combineReducers } from 'redux';
import apiRequest from './apiRequest';
import recRequest from './recRequest';
import favoriteRecipes from './favoriteRecipes';

const rootReducer = combineReducers({
  api: apiRequest,
  recommendations: recRequest,
  favorites: favoriteRecipes,
});

export default rootReducer;
