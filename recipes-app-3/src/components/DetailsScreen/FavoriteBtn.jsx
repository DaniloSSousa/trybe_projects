import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import favoriteIconWhite from '../../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';
import { getRouteInfo } from '../../helpers';

const createFavoriteItem = (data, id, isFood) => ({
  id,
  type: isFood ? 'comida' : 'bebida',
  area: data.strArea ? data.strArea : '',
  category: data.strCategory,
  alcoholicOrNot: data.strAlcoholic ? data.strAlcoholic : '',
  name: isFood ? data.strMeal : data.strDrink,
  image: isFood ? data.strMealThumb : data.strDrinkThumb,
});

const checkFavorite = (id) => {
  const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (currentFavorites) {
    return currentFavorites.some((item) => item.id === id);
  }
  return false;
};

const setLocalFavorite = (favoriteItem, id) => {
  let currentFavorites = localStorage.getItem('favoriteRecipes');
  if (!currentFavorites) {
    const favorites = JSON.stringify([favoriteItem]);
    localStorage.setItem('favoriteRecipes', favorites);
  } else {
    currentFavorites = JSON.parse(currentFavorites);
    if (checkFavorite(id)) {
      currentFavorites = currentFavorites.filter((item) => item.id !== id);
    } else {
      currentFavorites.push(favoriteItem);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavorites));
  }
};

const FavoriteBtn = () => {
  const [favorite, setFavorite] = useState(false);
  const location = useLocation();
  const recipeData = useSelector((state) => state.api.data);
  const id = getRouteInfo(location).recipeId;
  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const favoriteItem = createFavoriteItem(Object.values(recipeData)[0][0], id, isFood);
  useEffect(() => {
    setFavorite(checkFavorite(id));
  }, [id]);

  return (
    <input
      type="image"
      src={favorite ? favoriteIconBlack : favoriteIconWhite}
      alt="Favorite button"
      onClick={() => {
        setFavorite(!favorite);
        setLocalFavorite(favoriteItem, id);
      }}
      data-testid="favorite-btn"
    />
  );
};

export default FavoriteBtn;
