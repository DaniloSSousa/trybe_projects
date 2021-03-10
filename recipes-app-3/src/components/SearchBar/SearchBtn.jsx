import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMeals, cleanDataState } from '../../actions/apiRequest';

const returnEndpoint = (searchInput, radioInput, location) => {
  const endpointCheck = radioInput === 'i' ? 'filter' : 'search';
  if (location.pathname.startsWith('/comidas')) {
    return `https://www.themealdb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  } if (location.pathname.startsWith('/bebidas')) {
    return `https://www.thecocktaildb.com/api/json/v1/1/${endpointCheck}.php?${radioInput}=${searchInput}`;
  }
  return undefined;
};

const checkData = (data, history, location) => {
  let id = '';
  if (Object.keys(data).includes('meals')) {
    if (data.meals.length === 1) {
      id = data.meals[0].idMeal;
      return history.push(`${location.pathname}/${id}`);
    }
  } else if (data.drinks.length === 1) {
    id = data.drinks[0].idDrink;
    return history.push(`${location.pathname}/${id}`);
  }
  return null;
};
const checkNull = (data, dispatch, history, location) => {
  if (Object.values(data).includes(null)) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    dispatch(cleanDataState());
    return null;
  }
  if (Object.keys(data).length !== 0) {
    checkData(data, history, location);
  }
  return null;
};

const SearchButton = ({ searchRadio, searchInput }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const data = useSelector((state) => state.api.data);
  checkNull(data, dispatch, history, location);

  return (
    <button
      type="button"
      onClick={() => {
        if (searchRadio === 'f' && searchInput.length > 1) {
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        dispatch(
          fetchMeals(returnEndpoint(searchInput, searchRadio, location)),
        );

        return undefined;
      }}
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
  );
};

SearchButton.propTypes = {
  searchRadio: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default SearchButton;
