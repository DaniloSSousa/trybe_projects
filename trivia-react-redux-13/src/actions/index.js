import { setLS } from '../helpers';

// actions para armazenamento de email e name do player

export const PLAYER_ADD = 'PLAYER_ADD';

export const actionPlayerAdd = (player) => ({
  type: PLAYER_ADD,
  player,
});

// actions para armazenamento de token recebido via API

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export const TOKEN_ADD = 'TOKEN_ADD';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const actionTokenRequest = () => ({
  type: TOKEN_REQUEST,
});

export const actionTokenReceived = (token) => ({
  type: TOKEN_RECEIVED,
  token,
});

export const actionTokenAdd = (token) => ({
  type: TOKEN_ADD,
  token,
});

export const actionTokenError = (error) => ({
  type: TOKEN_ERROR,
  error,
});

// actions para armazenamento de dados de perguntas recebidas via API

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_RECEIVED = 'DATA_RECEIVED';
export const DATA_ADD = 'DATA_ADD';
export const DATA_ERROR = 'DATA_ERROR';

export const actionDataRequest = () => ({
  type: DATA_REQUEST,
});

export const actionDataReceived = (data) => ({
  type: DATA_RECEIVED,
  data,
});

export const actionDataAdd = (data) => ({
  type: DATA_ADD,
  data,
});

export const actionDataError = (error) => ({
  type: DATA_ERROR,
  error,
});

const asyncActionData = (url) =>
  (dispatch) => {
    dispatch(actionDataRequest());
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLS('data', data.results);
        return dispatch(actionDataReceived(data.results));
      })
      .catch((error) => dispatch(actionDataError(error)));
  };

export const asyncActionTokenData = (url) =>
  (dispatch) => {
    dispatch(actionTokenRequest());
    return fetch(url)
      .then((response) => response.json())
      .then((token) => {
        setLS('token', token);
        dispatch(actionTokenReceived(token));
        return dispatch(asyncActionData(`https://opentdb.com/api.php?amount=5&token=${token.token}`));
      })
      .catch((error) => dispatch(actionTokenError(error)));
  };
