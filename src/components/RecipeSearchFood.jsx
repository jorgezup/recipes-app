import PropTypes from 'prop-types';
import React from 'react';

const MAX_RECIPES = 12;

const RecipeSearchFood = ({ recipes, history }) => {
  // const [foodSearch, setFoodSearch] = useState();

  const filtered = recipes.reduce((acc, curl, index) => {
    if (index < MAX_RECIPES) acc.push(curl);
    return acc;
  }, []);

  return (
    <div>
      {
        filtered.length === 1
          ? history.push(`/foods/${filtered[0].idMeal}`)
          : filtered.map((recipe, index) => (
            <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt=""
              />
            </div>
          ))
      }
    </div>
  );
};

RecipeSearchFood.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

export default RecipeSearchFood;
