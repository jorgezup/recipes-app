import PropTypes from 'prop-types';
import React from 'react';

const MAX_RECIPES = 12;

const RecipeSearchDrink = ({ recipes, history }) => {
  const filtered = recipes.reduce((acc, curl, index) => {
    if (index < MAX_RECIPES) acc.push(curl);
    return acc;
  }, []);

  return (
    <div>
      {
        filtered.length === 1
          ? history.push(`/drinks/${filtered[0].idDrink}`)
          : filtered.map((recipe, index) => (
            <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt=""
              />
            </div>
          ))
      }
    </div>
  );
};

RecipeSearchDrink.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

export default RecipeSearchDrink;
