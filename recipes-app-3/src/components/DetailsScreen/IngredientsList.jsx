import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ ingredients, recipe }) => (
  <div>
    <h2>Ingredientes</h2>
    <ul>
      {ingredients(recipe).map((item, index) => (
        <li
          key={`${item.ingredient}${item.measure}`}
          data-testid={`${index}-ingredient-name-and-measure`}
        >{`${item.ingredient} - ${item.measure}`}</li>
      ))}
    </ul>
  </div>
);

IngredientsList.propTypes = {
  ingredients: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IngredientsList;
