import { TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_ADD, TOKEN_ERROR } from '../actions';

const initialState = {
  loading: false,
  token: {},
  error: {},
};

const reducerToken = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_REQUEST:
      return { ...state, loading: true };
    case TOKEN_RECEIVED:
      return { ...state, loading: false, token: action.token };
    case TOKEN_ADD:
      return { ...state, token: action.token };
    case TOKEN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducerToken;
