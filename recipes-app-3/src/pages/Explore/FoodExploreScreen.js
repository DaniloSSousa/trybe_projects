import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { requestAPI } from '../../services/requestAPI';

const buttons = (path, food) => {
  if (path === '/explorar/comidas') {
    return (
      <div>
        <div className="card">
          <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient" className="card-body">Por Ingredientes</Link>
        </div>
        <div className="card">
          <Link to="/explorar/comidas/area" data-testid="explore-by-area" className="card-body">Por Local de Origem</Link>
        </div>
        <div className="card">
          <Link to={`/comidas/${food.idMeal}`} data-testid="explore-surprise" className="card-body">Me Surpreenda!</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="card">
        <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient" className="card-body">Por Ingredientes</Link>
      </div>
      <div className="card">
        <Link to={`/bebidas/${food.idDrink}`} data-testid="explore-surprise" className="card-body">Me Surpreenda!</Link>
      </div>
    </div>
  );
};

const FoodExploreScreen = () => {
  const location = useLocation();
  const [food, setFood] = useState([]);

  useEffect(() => {
    const request = async () => {
      let response;
      if (location.pathname === '/explorar/comidas') {
        response = await requestAPI('https://www.themealdb.com/api/json/v1/1/random.php');
        return setFood(Object.values(response)[0][0]);
      }
      response = await requestAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      console.log(Object.values(response)[0][0].idDrink);
      return setFood(Object.values(response)[0][0]);
    };

    request();
  });
  return (
    <div>
      <Header />
      <Footer />
      {buttons(location.pathname, food)}
    </div>
  );
};

export default FoodExploreScreen;
