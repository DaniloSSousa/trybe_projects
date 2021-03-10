import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import {
  ItemCard, CategotyFilter, Header, Footer,
} from '../components';
import '../css/mainScreen.css';

const DrinksScreen = ({ data, fetchMealsProps }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  let drinks = [];
  if (data.length !== 0) {
    drinks = Object.values(data)[0] ? Object.values(data)[0].slice(0, 12) : [];
  }

  useEffect(() => {
    if (filterCategory === 'All') {
      fetchMealsProps('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchMealsProps(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterCategory}`);
    }
  }, [filterCategory, fetchMealsProps]);
  return (
    <div className="main-page">
      <Header />
      {CategotyFilter('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setFilterCategory, filterCategory)}
      <div className="meals-container " data-ride="carousel">
        {drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => ItemCard(strDrink, strDrinkThumb, index, `/bebidas/${idDrink}`))}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.api.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsProps: (e) => dispatch(fetchMeals(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksScreen);

DrinksScreen.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  fetchMealsProps: PropTypes.func.isRequired,
};
