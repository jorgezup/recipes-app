import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import doneRecipe from '../images/doneRecipe.png';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

const Footer = () => {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        className="cocktails"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        className="cocktails"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img className="fav-icon" src={ whiteHeartIcon } alt="Favorite Icon" />
      </button>
      <button
        type="button"
        className="explore"
        onClick={ () => history.push('/done-recipes') }
      >
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        className="foods"
        onClick={ () => history.push('/foods') }
      >
        <img className="done-recipes" src={ doneRecipe } alt="done Recipe Icon" />
      </button>
      <button
        type="button"
        className="foods"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
};

export default Footer;
