import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import IngredientsList from '../components/InProgressScreen/IngredientsList';
import ShareBtn from '../components/InProgressScreen/ShareBtn';
import FavoriteBtn from '../components/DetailsScreen/FavoriteBtn';
import { recipeKeysToArray } from '../helpers';
// import { getLS } from '../helpers';

// Returns an array of objects with ingredient/measure pairs
const getIngredients = (recipe) => {
  const ingredientsKeys = recipeKeysToArray(recipe, 'strIngredient');
  const measuresKeys = recipeKeysToArray(recipe, 'strMeasure');

  return ingredientsKeys.map((item, index) => ({
    ingredient: item,
    measure: measuresKeys[index],
  }));
};

const routeToFetch = (isFood, recipeId) => (isFood
  ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

const recipeInfo = (recipe, isFood) => ({
  image: isFood ? recipe.strMealThumb : recipe.strDrinkThumb,
  title: isFood ? recipe.strMeal : recipe.strDrink,
  categoryOrAlcoholic: isFood ? recipe.strCategory : recipe.strAlcoholic,
  ingredients: getIngredients(recipe),
  instructions: recipe.strInstructions,
});

// const manageLocalStorage = (recipeId, isFood, ingredientsList) => {
//   const currentLS = getLS('inProgressRecipes');
//   console.log(currentLS);
// };

const InProcessScreen = ({
  match: {
    params: { id: recipeId },
  },
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isFood] = useState(location.pathname.startsWith('/comidas'));
  const recipe = useSelector(
    (state) => state.api.data[isFood ? 'meals' : 'drinks'],
  );
  const checkBoxList = document.getElementsByName('ingredient-item');

  checkBoxList.entries((value) => console.log(value));

  useEffect(() => {
    dispatch(fetchMeals(routeToFetch(isFood, recipeId)));
    // manageLocalStorage(recipeId, isFood);
  }, []); // eslint-disable-line

  return !recipe ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <img
        src={recipeInfo(recipe[0], isFood).image}
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipeInfo(recipe[0], isFood).title}</h1>
      <h3 data-testid="recipe-category">
        {recipeInfo(recipe[0], isFood).categoryOrAlcoholic}
      </h3>
      <ShareBtn />
      <FavoriteBtn />
      <IngredientsList
        recipeInfo={recipeInfo}
        recipe={recipe}
        isFood={isFood}
      />
      <div>
        <h2>Instruções</h2>
        <p data-testid="instructions">
          {recipeInfo(recipe[0], isFood).instructions}
        </p>
      </div>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

InProcessScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default InProcessScreen;
