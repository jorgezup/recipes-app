import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const RecipeSearchFood = ({ recipes }) => {
  const history = useHistory();

  return (
    <div>
      {
        recipes.length === 1
          ? history.push(`/foods/${recipes[0].idMeal}`)
          : recipes.map((recipe, index) => (
            <Link
              key={ recipe.idMeal }
              to={ `/foods/${recipe.idMeal}` }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt=""
                  style={ { width: '100%' } }
                />
              </div>
            </Link>
          ))
      }
    </div>
  );
};

RecipeSearchFood.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

export default RecipeSearchFood;
