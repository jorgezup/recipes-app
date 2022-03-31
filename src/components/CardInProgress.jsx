import PropTypes from 'prop-types';
import React from 'react';

const CardInProgress = ({ title, image, category, ingredients, instructions }) => (
  <div>
    <h3 data-testid="recipe-title">{title}</h3>
    <img
      data-testid="recipe-photo"
      src={ image }
      alt=""
      style={ { width: '100%' } }
    />
    <p data-testid="recipe-category">{category}</p>
    <ul>
      {
        ingredients.map((ingredient, index) => {
          console.log(ingredient);
          return (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>{ingredient}</li>
          );
        })
      }
    </ul>
    <p data-testid="instructions">{instructions}</p>
    <button data-testid="share-btn" type="button">Compartilhar</button>
    <button data-testid="favorite-btn" type="button">Favoritar</button>
    <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
  </div>
);

CardInProgress.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default CardInProgress;