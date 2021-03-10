import * as actionType from '../actions/actionsType';

const INITIAL_STATE = { loading: true, data: '', error: '' };

const recRequest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.FETCH_REC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_REC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actionType.FETCH_REC_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recRequest;
