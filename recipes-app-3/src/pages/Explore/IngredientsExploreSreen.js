import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header, Footer } from '../../components';
import { requestAPI } from '../../services/requestAPI';
import { fetchMeals } from '../../actions/apiRequest';

const IngredientCard = (ingredient, index) => {
  const location = useLocation();
  const dispatch = useDispatch();
  let name;
  let imgSrc;
  let route;
  let url;
  if (location.pathname === '/explorar/comidas/ingredientes') {
    name = ingredient.strIngredient;
    imgSrc = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
    route = '/comidas';
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  }

  if (location.pathname === '/explorar/bebidas/ingredientes') {
    name = ingredient.strIngredient1;
    imgSrc = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
    route = '/bebidas';
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
  }
  return (
    <div key={name} className="card" data-testid={`${index}-ingredient-card`}>
      <Link
        to={route}
        onClick={() => {
          (dispatch(fetchMeals(url)));
        }}
      >
        <img src={imgSrc} alt={name} data-testid={`${index}-card-img`} />
      </Link>
      <p data-testid={`${index}-card-name`}>{name}</p>
    </div>
  );
};

const IngredientsExploreSreen = () => {
  const location = useLocation();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const request = async () => {
      let response;
      if (location.pathname === '/explorar/comidas/ingredientes') {
        response = await requestAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        return setIngredients(Object.values(response)[0]);
      }
      if (location.pathname === '/explorar/bebidas/ingredientes') {
        response = await requestAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        return setIngredients(Object.values(response)[0]);
      }
      return null;
    };
    request();
  });
  console.log(ingredients);
  return (
    <div>
      <Header />
      <Footer />
      {ingredients.slice(0, 12).map((ingredient, index) => IngredientCard(ingredient, index))}
    </div>
  );
};

export default IngredientsExploreSreen;
