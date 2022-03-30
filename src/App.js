import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Ingredients from './pages/Ingredients';
import Nationalities from './pages/Nationalities';
import IngredientsDrinks from './pages/IngredientsDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ Food } />
      <Route exact path="/drinks/:id" component={ Drink } />
      <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ Ingredients } />
      <Route path="/explore/foods/nationalities" component={ Nationalities } />
      <Route path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
