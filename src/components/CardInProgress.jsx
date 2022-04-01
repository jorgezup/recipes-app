import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { setMealInProgress } from '../services/localStorage/recipesInProgress';

const CardInProgress = ({ recipe }) => {
  const [checkIngredient, setCheckIngredient] = useState(true);
  const toggleCheckBox = () => setCheckIngredient(!checkIngredient);

  const handleCheckIngredient = (id, ingredient) => {
    console.log(id);
    toggleCheckBox();
    console.log(checkIngredient);
    if (checkIngredient === true) {
      console.log(ingredient);
      setMealInProgress(id, ingredient);
    } else {
      console.log('tchau');
    }
  };
  return (
    <div style={ { width: '360px' } }>
      <h3 data-testid="recipe-title">{recipe.title}</h3>
      <img
        data-testid="recipe-photo"
        src={ recipe.image }
        alt=""
        style={ { width: '100%' } }
      />
      <p data-testid="recipe-category">{recipe.category}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ ingredient }>
              <input
                type="checkbox"
                name={ ingredient }
                id={ ingredient }
                onChange={ () => handleCheckIngredient(recipe.id, ingredient) }
              />
              {ingredient}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.instructions}</p>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <button data-testid="favorite-btn" type="button">
        Favoritar
      </button>
      <button data-testid="finish-recipe-btn" type="button">
        Finalizar
      </button>
    </div>
  );
};

CardInProgress.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default CardInProgress;
