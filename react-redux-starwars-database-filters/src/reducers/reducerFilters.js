import { NAME_FILTER, NUMERIC_FILTER, DEL_NUMERIC_FILTER } from '../actions';

const initialState = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

const reducerFilters = (state = initialState, action) => {
  switch (action.type) {
    case NAME_FILTER:
      return { ...state, filterByName: { name: action.text } };
    case NUMERIC_FILTER:
      return {
        ...state, filterByNumericValues: [...state.filterByNumericValues, action.numericFilter],
      };
    case DEL_NUMERIC_FILTER:
      return {
        ...state,
        filterByNumericValues: state.filterByNumericValues.filter((filter) =>
          filter.column !== action.columnFilter),
      };
    default:
      return state;
  }
};

export default reducerFilters;
