import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipesScreen/FavoriteRecipeCard';
import FilterBtn from '../components/FavoriteRecipesScreen/FilterBtn';
import favoriteRecipes from '../actions/favoriteRecipes';
import { getLS } from '../helpers';

const filterFavorites = (arr, filter) => arr.filter((item) => {
  if (filter === 'food') {
    return item.type === 'comida';
  }

  if (filter === 'drink') {
    return item.type === 'bebida';
  }

  return item;
});

const FavoriteRecipesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    dispatch(favoriteRecipes(getLS('favoriteRecipes')));
  }, []); // eslint-disable-line
  if (!favorites) {
    return (
      <div>
        <Header />
        <br />
        Este perfil não possui receitas favoritas!
      </div>
    );
  }
  return (
    <div>
      <FilterBtn
        dataTestId="filter-by-food-btn"
        filter="food"
        setFilter={(value) => setFilter(value)}
        text="Food"
      />
      <FilterBtn
        dataTestId="filter-by-drink-btn"
        filter="drink"
        setFilter={(value) => setFilter(value)}
        text="Drinks"
      />
      <FilterBtn
        dataTestId="filter-by-all-btn"
        filter="all"
        setFilter={(value) => setFilter(value)}
        text="All"
      />

      {filterFavorites(favorites, filter).map((favoriteItem, index) => (
        <FavoriteRecipeCard
          key={favoriteItem.id}
          favoriteItem={favoriteItem}
          favoriteItemIndex={index}
        />
      ))}
    </div>
  );
};

export default FavoriteRecipesScreen;
