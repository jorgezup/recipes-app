import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Layout from '../components/Layout';

function DoneRecipes() {
  const [recipeName, setRecipeName] = useState([]);

  useEffect(() => {
    // Colocar a lógica na página services/localStorage.
    const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(recipe);
    setRecipeName(recipe);
  }, []);

  console.log(recipeName);

  return (
    <Layout title="Done Recipes">
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {recipeName && recipeName.map((recipe, index) => (
        <section key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.title }
            data-testid={ `${index}-horizontal-image` }
          />
          <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <button
            type="button"
            onClick={ () => clipboardCopy(
              `http://localhost:3000/foods/${recipe.id}`,
            ) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
              src={ shareIcon }
              alt="icon-share"
            />
          </button>
          {recipe.tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}
        </section>
      ))}
    </Layout>
  );
}

DoneRecipes.propTypes = {
  location: PropTypes.shape({
    recipe: PropTypes.shape({
      ingredients: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default DoneRecipes;
