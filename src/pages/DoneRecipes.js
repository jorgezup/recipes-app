import React from 'react';
import Layout from '../components/Layout';

function DoneRecipes() {
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
    </Layout>
  );
}

export default DoneRecipes;
