import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const RecipeSearchDrink = ({ recipes }) => {
  const history = useHistory();
  return (
    <div>
      {
        recipes.length === 1
          ? history.push(`/drinks/${recipes[0].idDrink}`)
          : recipes.map((recipe, index) => (
            <Link
              key={ recipe.idDrink }
              to={ `/drinks/${recipe.idDrink}` }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strDrinkThumb }
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

RecipeSearchDrink.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

export default RecipeSearchDrink;
