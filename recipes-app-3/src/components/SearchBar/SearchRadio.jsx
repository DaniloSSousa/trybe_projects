import React from 'react';
import PropTypes from 'prop-types';

const SearchRadio = ({ id, value, searchRadio, setSearchRadio, label }) => (
  <React.Fragment>
    <input
      type="radio"
      name="search-radio"
      id={id}
      value={value}
      checked={searchRadio === value}
      onChange={(event) => setSearchRadio(event.target.value)}
      data-testid={`${id}-search-radio`}
    />
    <label htmlFor={id}>{label}</label>
  </React.Fragment>
);

SearchRadio.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  searchRadio: PropTypes.string.isRequired,
  setSearchRadio: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchRadio;
