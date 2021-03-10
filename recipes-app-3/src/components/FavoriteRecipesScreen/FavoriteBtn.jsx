import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import favoriteIconWhite from '../../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';
import { getLS, setLS } from '../../helpers';
import favoriteRecipes from '../../actions/favoriteRecipes';

const removeFavorite = (id) => {
  const favorites = getLS('favoriteRecipes');
  const favoritesFiltered = favorites.filter((item) => item.id !== id);
  setLS('favoriteRecipes', favoritesFiltered);
};

const FavoriteBtn = ({ id, index }) => {
  const [favorite, setFavorite] = useState(true);
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="image"
        src={favorite ? favoriteIconBlack : favoriteIconWhite}
        alt="Favorite button"
        onClick={() => {
          setFavorite(!favorite);
          removeFavorite(id);
          dispatch(favoriteRecipes(getLS('favoriteRecipes')));
        }}
        data-testid={`${index}-horizontal-favorite-btn`}
      />
    </div>
  );
};

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteBtn;
