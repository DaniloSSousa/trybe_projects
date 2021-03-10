import { DATA_REQUEST, DATA_RECEIVED, DATA_ADD, DATA_ERROR } from '../actions';

const initialState = {
  loading: false,
  data: [],
  error: {},
};

const reducerData = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return { ...state, loading: true };
    case DATA_RECEIVED:
      return { ...state, loading: false, data: action.data };
    case DATA_ADD:
      return { ...state, data: action.data };
    case DATA_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducerData;
