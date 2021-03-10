import React from 'react';
import PropTypes from 'prop-types';

const FilterBtn = ({ dataTestId, filter, setFilter, text }) => (
  <button
    type="button"
    data-testid={dataTestId}
    onClick={() => setFilter(filter)}
  >
    {text}
  </button>
);

FilterBtn.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default FilterBtn;
