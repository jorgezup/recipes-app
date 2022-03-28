import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneReciples from './pages/DoneReciples';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ Foods } />
      <Route path="/drinks/:id" component={ Foods } />
      <Route path="/foods/:id/in-progress" component={ Foods } />
      <Route path="/drinks/:id/in-progress" component={ Foods } />
      <Route exact path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ Explore } />
      <Route path="/explore/drinks" component={ Explore } />
      <Route path="/explore/foods/ingredients" component={ Explore } />
      <Route path="/explore/drinks/ingredients" component={ Explore } />
      <Route path="/explore/foods/nationalities" component={ Explore } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneReciples } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
