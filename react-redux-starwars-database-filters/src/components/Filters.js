import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncActionDataFetch, actionNameFilter,
  actionNumericFilter, actionDelNumericFilter,
} from '../actions';

const SelectColumn = ({ columnValues }) =>
  <select
    id="column-filter" data-testid="column-filter" defaultValue={columnValues[0]}
  >
    {columnValues.map((column) => (<option key={column}>{column}</option>))}
  </select>;

const SelectComparisom = ({ comparisonValues }) =>
  <select
    id="comparison-filter" data-testid="comparison-filter" defaultValue={comparisonValues[0]}
  >
    {comparisonValues.map((comparison) => (<option key={comparison}>{comparison}</option>))}
  </select>;

const Filters = ({ dataFetch, nameFilter, numericFilter, filters, delNumericFilter }) => {
  (() => dataFetch('https://swapi-trybe.herokuapp.com/api/planets/'))();

  const returnStoreColumns = (f) => {
    const columns = ['coluna', 'population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];
    const storeColumns = f.map(({ column }) => column);
    const updatedColumns = columns.filter((column) => !storeColumns.includes(column));
    return updatedColumns;
  };

  const storeFilters = (nF, e) => {
    e.preventDefault();
    const elColumn = document.getElementById('column-filter');
    const column = elColumn.options[elColumn.selectedIndex].value;
    const elComparison = document.getElementById('comparison-filter');
    const comparison = elComparison.options[elComparison.selectedIndex].value;
    const value = document.getElementById('value-filter').value;
    return nF({ column, comparison, value });
  };

  const delStoreFilter = (column, dNF) => dNF(column);

  const comparisonValues = ['comparação', 'maior que', 'menor que', 'igual a'];

  return (
    <div>
      <label htmlFor="planet-filter">Procurar </label>
      <input
        type="text" id="planet-filter" data-testid="name-filter"
        onChange={(e) => nameFilter(e.target.value)}
      />
      <form onSubmit={(e) => storeFilters(numericFilter, e)}>
        <SelectColumn columnValues={returnStoreColumns(filters)} />
        <SelectComparisom comparisonValues={comparisonValues} />
        <input id="value-filter" type="number" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
      {filters.map(({ column, comparison, value }) => <div key={column} data-testid="filter">
        {`${column} ${comparison} ${value}`}
        <button onClick={() => delStoreFilter(column, delNumericFilter)}>X</button>
      </div>)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filters: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  dataFetch: (url) => dispatch(asyncActionDataFetch(url)),
  nameFilter: (text) => dispatch(actionNameFilter(text)),
  numericFilter: (oNumericFilter) => dispatch(actionNumericFilter(oNumericFilter)),
  delNumericFilter: (column) =>
    dispatch(actionDelNumericFilter(column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

Filters.propTypes = {
  dataFetch: PropTypes.func.isRequired,
  nameFilter: PropTypes.func.isRequired,
  numericFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  delNumericFilter: PropTypes.func.isRequired,
};

SelectColumn.propTypes = {
  columnValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SelectComparisom.propTypes = {
  comparisonValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};
