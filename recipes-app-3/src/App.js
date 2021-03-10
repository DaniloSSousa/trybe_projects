import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  LoginScreen,
  MealsScreen,
  DrinksScreen,
  DetailsScreen,
  DoneRecipesScreen,
  ProfileScreen,
  ExploreScreen,
  FoodExploreScreen,
  FavoriteRecipesScreen,
  IngredientsExploreScreen,
  InProgressScreen,
  AreaExploreScreen,
} from './pages';

function App() {
  return (
    <div id="meals">
      <main>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/comidas" component={MealsScreen} />
          <Route exact path="/bebidas" component={DrinksScreen} />
          <Route exact path="/comidas/:id" component={DetailsScreen} />
          <Route exact path="/bebidas/:id" component={DetailsScreen} />
          <Route path="/comidas/:id/in-progress" component={InProgressScreen} />
          <Route path="/bebidas/:id/in-progress" component={InProgressScreen} />
          <Route exact path="/explorar" component={ExploreScreen} />
          <Route exact path="/explorar/comidas" component={FoodExploreScreen} />
          <Route exact path="/explorar/bebidas" component={FoodExploreScreen} />
          <Route path="/explorar/comidas/ingredientes" component={IngredientsExploreScreen} />
          <Route exact path="/explorar/bebidas/ingredientes" component={IngredientsExploreScreen} />
          <Route path="/explorar/comidas/area" component={AreaExploreScreen} />
          <Route path="/perfil" component={ProfileScreen} />
          <Route path="/receitas-feitas" component={DoneRecipesScreen} />
          <Route path="/receitas-favoritas" component={FavoriteRecipesScreen} />
          <Route exact path="*" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
