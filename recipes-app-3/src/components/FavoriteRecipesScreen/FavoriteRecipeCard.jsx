import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const FavoriteRecipeCard = ({ favoriteItem, favoriteItemIndex }) => (
  <div>
    <Link to={`/${favoriteItem.type}s/${favoriteItem.id}`}>
      <img
        src={favoriteItem.image}
        alt="Recipe food or drink"
        data-testid={`${favoriteItemIndex}-horizontal-image`}
      />
    </Link>
    <Link to={`/${favoriteItem.type}s/${favoriteItem.id}`}>
      <h2 data-testid={`${favoriteItemIndex}-horizontal-name`}>
        {favoriteItem.name}
      </h2>
    </Link>
    {favoriteItem.type === 'comida' ? (
      <h3 data-testid={`${favoriteItemIndex}-horizontal-top-text`}>
        {`${favoriteItem.area} - ${favoriteItem.category}`}
      </h3>
    ) : (
      <h3 data-testid={`${favoriteItemIndex}-horizontal-top-text`}>
        {favoriteItem.alcoholicOrNot}
      </h3>
    )}
    <ShareBtn
      type={favoriteItem.type}
      id={favoriteItem.id}
      index={favoriteItemIndex}
    />
    <FavoriteBtn id={favoriteItem.id} index={favoriteItemIndex} />
  </div>
);

FavoriteRecipeCard.propTypes = {
  favoriteItem: PropTypes.objectOf(PropTypes.string).isRequired,
  favoriteItemIndex: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
