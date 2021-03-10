import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import {
  IngredientsList,
  EmbeddedVideo,
  FavoriteBtn,
  ShareBtn,
} from '../components';
import { fetchRec } from '../actions/recRequest';
import { setLS, recipeKeysToArray } from '../helpers';
import Recommendations from '../components/Recommendations/Recommendations';
import StateRecipeBtn from '../components/DetailsScreen/StateRecipeBtn';

const keysLS = () => {
  const aDoneRecipes = [
    {
      id: 0,
      type: '',
      area: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: [],
    },
  ];
  const oInProgressRecipes = {
    cocktails: { 178319: [] },
    meals: { 52771: [] },
  };
  setLS('doneRecipes', aDoneRecipes);
  return setLS('inProgressRecipes', oInProgressRecipes);
};

// Returns an array of objects with ingredient/measure pairs
const getIngredients = (recipe) => {
  const ingredientsKeys = recipeKeysToArray(recipe, 'strIngredient');
  const measuresKeys = recipeKeysToArray(recipe, 'strMeasure');

  return ingredientsKeys.map((item, index) => ({
    ingredient: item,
    measure: measuresKeys[index],
  }));
};

// ===== Funções criadas para diminuir complexidade cognitiva =====
const fetchs = (dispatch, idPage, isMeal) => (isMeal
  ? (dispatch(
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPage}`,
    ),
  ),
  dispatch(
    fetchRec('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='),
  ))
  : (dispatch(
    fetchMeals(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idPage}`,
    ),
  ),
  dispatch(
    fetchRec('https://www.themealdb.com/api/json/v1/1/search.php?s='),
  )));

const recipeData = (isFood, recipe) => (
  <div>
    <img
      src={isFood ? recipe.strMealThumb : recipe.strDrinkThumb}
      alt="Recipe food"
      data-testid="recipe-photo"
    />
    <h1 data-testid="recipe-title">
      {isFood ? recipe.strMeal : recipe.strDrink}
    </h1>
    <h3 data-testid="recipe-category">
      {isFood ? recipe.strCategory : recipe.strAlcoholic}
    </h3>
  </div>
);

const recommendations = (store, sixRecs, rec) => (
  <div>
    {store.load === true ? (
      'Loading...'
    ) : (
      <Recommendations sixRecs={sixRecs} rec={rec} />
    )}
  </div>
);

const getData = (selector, rec) => ({
  data: selector((state) => state.api.data),
  loading: selector((state) => state.api.loading),
  load: selector((state) => state.recommendations.loading),
  recs: selector(
    (state) => state.recommendations.data[`${rec.toLowerCase()}s`],
  ),
});
// ===== Fim =====

const DetailsScreen = ({
  match: {
    params: { id: idPage },
  },
}) => {
  keysLS();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMeal = location.pathname.startsWith('/comidas');
  const rec = isMeal ? 'Drink' : 'Meal';
  const currentRecipe = isMeal ? 'meals' : 'drinks';
  const store = getData(useSelector, rec);
  console.log(store);
  const recipe = store.data[currentRecipe];
  const sixRecs = store.recs ? store.recs.slice(0, 6) : [];

  useEffect(() => {
    fetchs(dispatch, idPage, isMeal);
  }, []); // eslint-disable-line

  return !recipe ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {recipeData(isMeal, recipe[0])}
      <ShareBtn />
      <FavoriteBtn />
      <IngredientsList ingredients={getIngredients} recipe={recipe[0]} />
      <div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe[0].strInstructions}</p>
      </div>
      <EmbeddedVideo isFood={isMeal} recipe={recipe[0]} />
      {recommendations(store, sixRecs, rec)}
      <StateRecipeBtn idPage={idPage} rec={rec} />
    </div>
  );
};

DetailsScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsScreen;
