import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { checkNamePlanet, checkFilters } from '../helpers';
import StarWarsContext from '../context/StarWarsContext';

const THeadBody = ({ data, filterName, storeFilters }) =>
  (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        <TBody data={data} filterName={filterName} storeFilters={storeFilters} />
      </tbody>
    </table>
  );

const TBody = ({ data, filterName, storeFilters }) =>
  data.filter((planet) => checkNamePlanet(planet.name, filterName))
    .filter((planet) => storeFilters.every((filter) => checkFilters(planet, filter)))
    .map((planet) =>
      (
        <tr key={planet.name}>
          <td data-testid="planet-name">{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ));

const Table = () => {
  const { getData: [data], getFilters: [filters] } = useContext(StarWarsContext);
  const loading = data.loading;
  const filtersNV = filters.filterByNumericValues;
  const filtersNN = filters.filterByName.name;

  return (loading ? <p>Loading...</p> :
    <div>
      <p>StarWars Datatable with Filters</p>
      <THeadBody data={data.data} filterName={filtersNN} storeFilters={filtersNV} />
    </div>
  );
};

export default Table;

// Table.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   filterName: PropTypes.string.isRequired,
//   storeFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

THeadBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterName: PropTypes.string.isRequired,
  storeFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
};
