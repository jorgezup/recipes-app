import React, { useEffect, useState } from 'react';
import DoneFoods from '../components/DoneFoods';
import DoneDrinks from '../components/DoneDrinks';
import Layout from '../components/Layout';

function DoneRecipes() {
  const [recipeName, setRecipeName] = useState([]);

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipeName(...recipeName, recipe);
  }, []);

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
        <section key={ index }>
          {console.log(recipe)}
          {recipe.type === 'food'
            ? <DoneFoods recipe={ recipe } index={ index } />
            : <DoneDrinks recipe={ recipe } index={ index } />}
        </section>
      ))}
    </Layout>
  );
}

export default DoneRecipes;
