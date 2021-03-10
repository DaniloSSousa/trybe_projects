import * as actionType from './actionsType';

export const fetchFavoriteRecipes = (favoriteRecipes) => ({
  type: actionType.FETCH_FAVORITE_RECIPES,
  payload: favoriteRecipes,
});

export default fetchFavoriteRecipes;
