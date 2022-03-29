import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: '0',
        // height: '70px',
        // display: 'flex',
        // justifyContent: 'space-around',
        // alignItems: 'center',
      } }
    >
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
};

export default Footer;
