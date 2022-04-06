import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const DoneDrinks = ({ recipe, index }) => (
  <section key={ recipe.id }>
    <img
      src={ recipe.image }
      alt={ recipe.name }
      data-testid={ `${index}-horizontal-image` }
    />
    <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
    <h3 data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</h3>
    <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
    <button
      type="button"
      onClick={ () => clipboardCopy(
        `http://localhost:3000/foods/${recipe.id}`,
      ) }
    >
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="icon-share"
      />
    </button>
  </section>
);

DoneDrinks.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneDrinks;
