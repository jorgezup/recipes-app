import React, { useEffect, useState } from 'react';
import DoneFoods from '../components/DoneFoods';
import DoneDrinks from '../components/DoneDrinks';
import Layout from '../components/Layout';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const [recipeName, setRecipeName] = useState([]);

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipeName(...recipeName, recipe);
  }, []);

  const filterByType = ({ target }) => {
    const { name } = target;
    if (name === 'Food') {
      const filteredFoods = recipeName.reduce((acc, curl) => {
        if (curl.type === 'food') acc.push(curl);
        return acc;
      }, []);
      setRecipeName(filteredFoods);
    }
    if (name === 'Drinks') {
      const filteredDrinks = recipeName.reduce((acc, curl) => {
        if (curl.type === 'drink') acc.push(curl);
        return acc;
      }, []);
      setRecipeName(filteredDrinks);
    }
    if (name === 'All') setRecipeName(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <Layout title="Done Recipes">
      <div className="container-filters">
        <button
          name="All"
          type="button"
          className="filter-done"
          data-testid="filter-by-all-btn"
          onClick={ filterByType }
        >
          All
        </button>
        <button
          name="Food"
          type="button"
          className="filter-done"
          data-testid="filter-by-food-btn"
          onClick={ filterByType }
        >
          Food
        </button>
        <button
          name="Drinks"
          type="button"
          className="filter-done"
          data-testid="filter-by-drink-btn"
          onClick={ filterByType }
        >
          Drinks
        </button>
      </div>
      <div className="container-done">
        {recipeName && recipeName.map((recipe, index) => (
          <section className="cards-done" key={ index }>
            {recipe.type === 'food'
              ? <DoneFoods recipe={ recipe } index={ index } />
              : <DoneDrinks recipe={ recipe } index={ index } />}
          </section>
        ))}
      </div>
    </Layout>
  );
}

export default DoneRecipes;
