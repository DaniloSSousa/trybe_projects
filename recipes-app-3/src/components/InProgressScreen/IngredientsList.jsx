import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ recipeInfo, recipe, isFood }) => (
  <form onChange={(e) => console.log(e.target)}>
    {recipeInfo(recipe[0], isFood).ingredients.map((item, index) => (
      <li
        key={`${item.ingredient}${item.measure}`}
        data-testid={`${index}-ingredient-step`}
        style={{ listStyle: 'none' }}
      >
        <label htmlFor={`ingredient${index}`}>
          <input
            type="checkbox"
            name="ingredient-item"
            id={`ingredient${index}`}
            className="ingredient-item"
            onClick={(e) => {
              const itemList = document.getElementById(item.ingredient);
              console.log(itemList);
              if (e.target.checked) {
                itemList.style.textDecoration = 'line-through';
              } else {
                itemList.style.textDecoration = 'initial';
              }
            }}
          />
          <span id={item.ingredient}>
            {item.ingredient}
            {item.measure ? ' - ' : ' '}
            {item.measure}
          </span>
        </label>
      </li>
    ))}
  </form>
);

IngredientsList.propTypes = {
  recipeInfo: PropTypes.func.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFood: PropTypes.bool.isRequired,
};

export default IngredientsList;
