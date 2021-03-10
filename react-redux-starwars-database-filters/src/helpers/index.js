export const checkNamePlanet = (planetName, filterName) => planetName.includes(filterName);
export const checkFilters = (planet, filter) => {
  if (filter.comparison === 'maior que') return +(planet[filter.column]) > +(filter.value);
  if (filter.comparison === 'menor que') return +(planet[filter.column]) < +(filter.value);
  return +(planet[filter.column]) === +(filter.value);
};
