import * as actionType from './actionsType';

export const fetchMealsRequest = () => ({
  type: actionType.FETCH_MEALS_REQUEST,
});

export const fetchMealsSuccess = (meals) => ({
  type: actionType.FETCH_MEALS_SUCCESS,
  payload: meals,
});

export const fetchMealsFailure = (error) => ({
  type: actionType.FETCH_MEALS_FAILURE,
  payload: error,
});

export const fetchMeals = (url) => (dispatch) => {
  dispatch(fetchMealsRequest());
  return fetch(url)
    .then((response) => response.json())
    .then((json) => dispatch(fetchMealsSuccess(json)))
    .catch((error) => dispatch(fetchMealsFailure(error)));
};

export const cleanDataState = () => ({
  type: actionType.CLEAN_DATA_STATE,
});
