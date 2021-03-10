// Obtém itens do local storage

export const getLS = (key) => JSON.parse(localStorage.getItem(key));

// Armazena itens no local storage

export const setLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Returns in an object the main route (comidas or bebidas) and the recipe ID
export const getRouteInfo = (location) => {
  const routeInfoArr = location.pathname
    .split('/')
    .filter((item) => item !== '');
  return { mainRoute: routeInfoArr[0], recipeId: routeInfoArr[1] };
};


// Get the desired object key from the recipe and returns an array
export const recipeKeysToArray = (recipe, key) => Object.keys(recipe)
  .filter((item) => item.startsWith(key))
  .map((item) => recipe[item])
  .filter((item) => item !== '' && item !== null);
