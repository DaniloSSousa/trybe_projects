import * as actionType from '../actions/actionsType';

// Foi necessário mudar o valor inicial de 'data' de '[]' para '{}' porque
// estava bugando o valor exigido nas prop-types
const INITIAL_STATE = { loading: true, data: {}, error: '' };

const apiRequest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.FETCH_MEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_MEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actionType.FETCH_MEALS_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case actionType.CLEAN_DATA_STATE:
      return {
        ...state,
        loading: null,
        data: [],
      };
    default:
      return state;
  }
};

export default apiRequest;
