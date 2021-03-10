import * as actionType from './actionsType';
// import { getLS, setLS } from '../helpers';

export const fetchRecRequest = () => ({
  type: actionType.FETCH_REC_REQUEST,
});

export const fetchRecSuccess = (recs) => ({
  type: actionType.FETCH_REC_SUCCESS,
  payload: recs,
});

export const fetchRecFailure = (error) => ({
  type: actionType.FETCH_REC_FAILURE,
  payload: error,
});

export const fetchRec = (url) => (dispatch) => {
  dispatch(fetchRecRequest());
  return fetch(url)
    .then((response) => response.json())
    .then((json) => dispatch(fetchRecSuccess(json)))
    .catch((error) => dispatch(fetchRecFailure(error)));
};
