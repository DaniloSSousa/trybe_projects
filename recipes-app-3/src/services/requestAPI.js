export const requestAPI = (url) => fetch(url).then((response) => response
  .json()
  .then((json) => {
    if (response.ok) return Promise.resolve(json);
    return Promise.reject(json);
  }));

// Returns a string with the correct endpoint based on the URL main route
export const returnEndpoint = (location, operator, isFood) => {
  const recipeId = location.pathname.split('/')[2];
  return (isFood)
    ? `https://www.themealdb.com/api/json/v1/1/${operator}.php?i=${recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/${operator}.php?i=${recipeId}`;
};
