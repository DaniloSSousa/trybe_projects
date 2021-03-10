import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ searchInput, setSearchInput }) => (
  <input
    type="text"
    placeholder="Buscar Receita"
    value={searchInput}
    onChange={(event) => setSearchInput(event.target.value)}
    data-testid="search-input"
    className="form-control"
  />
);

SearchInput.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
};

export default SearchInput;
