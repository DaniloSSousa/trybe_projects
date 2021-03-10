import * as actionType from '../actions/actionsType';

const INITIAL_STATE = [];

const favoriteRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.FETCH_FAVORITE_RECIPES:
      return action.payload;
    default:
      return state;
  }
};

export default favoriteRecipes;
