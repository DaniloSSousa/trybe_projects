import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

const SelectOrder = ({ data }) => {
  const planets = data.data;
  return (
    <select data-testid='column-sort'>
      {planets.map((planet) => Object.keys(planet))
        .filter((_ , i) => i === 0).flat()
        .filter((column) => column !== 'residents')
        .map((column) => (<option key={column}>{column}</option>))}
    </select>
  );
};

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

export default () => {
  const { getData: [data, setData], getFilters: [filters, setFilters] } = useContext(StarWarsContext);
  const filtersNV = filters.filterByNumericValues;

  useEffect(() => {
    setData({ loading: true });
    fetch('https://swapi.dev/api/planets/')
      .then((r) => r.json())
      .then((d) => setData({ data: d.results, loading: false }))
      .catch((e) => setData({ error: e, loading: false }));
  }, [setData]);

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
    return nF({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues, { column, comparison, value },
      ],
    });
  };

  const delStoreFilter = (column, dNF) => dNF({
    ...filters,
    filterByNumericValues: filters.filterByNumericValues.filter((filter) =>
      filter.column !== column),
  });

  const comparisonValues = ['comparação', 'maior que', 'menor que', 'igual a'];

  return (
    <div>
      <label htmlFor="planet-filter">Procurar </label>
      <input
        type="text" id="planet-filter" data-testid="name-filter"
        onChange={(e) => setFilters({ ...filters, filterByName: { name: e.target.value } })}
      />

      <form onSubmit={(e) => storeFilters(setFilters, e)}>
        {data.loading === false ? <SelectOrder data={data} /> : false}<br />
        <SelectColumn columnValues={returnStoreColumns(filtersNV)} />
        <SelectComparisom comparisonValues={comparisonValues} />
        <input id="value-filter" type="number" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>

      {filtersNV.map(({ column, comparison, value }) => <div key={column} data-testid="filter">
        {`${column} ${comparison} ${value}`}
        <button onClick={() => delStoreFilter(column, setFilters)}>X</button>
      </div>)}
    </div>
  );
};

SelectColumn.propTypes = {
  columnValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SelectComparisom.propTypes = {
  comparisonValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
