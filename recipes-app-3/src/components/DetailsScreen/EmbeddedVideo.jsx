import React from 'react';
import PropTypes from 'prop-types';

const EmbeddedVideo = ({ isFood, recipe }) => {
  if (!isFood) {
    return null;
  }
  return (
    <iframe
      width="560"
      height="315"
      src={recipe.strYoutube.replace('watch?v=', 'embed/')}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="recipe video"
      data-testid="video"
    />
  );
};

EmbeddedVideo.propTypes = {
  isFood: PropTypes.bool.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EmbeddedVideo;
