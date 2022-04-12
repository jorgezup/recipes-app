import React, { useEffect, useState } from 'react';
import DoneFoods from '../components/DoneFoods';
import DoneDrinks from '../components/DoneDrinks';
import Layout from '../components/Layout';
import '../css/DoneRecipes.css';
import { getFromLocalStorage } from '../services/localStorage/doneRecipes';

function DoneRecipes() {
  const [doneRecipesLocalStorage, setDoneRecipesLocalStorage] = useState([]);
  const [recipeName, setRecipeName] = useState([]);

  useEffect(() => {
    const doneRecipesFromLocalStorage = getFromLocalStorage('doneRecipes');
    setDoneRecipesLocalStorage(doneRecipesFromLocalStorage);
    setRecipeName(doneRecipesFromLocalStorage);
  }, []);

  const doneFoods = () => {
    const doneFood = doneRecipesLocalStorage.filter((foodsDone) => (
      foodsDone.type === 'food'
    ));
    setRecipeName(doneFood);
  };

  const doneDrinks = () => {
    const doneDrink = doneRecipesLocalStorage.filter((drinksDone) => (
      drinksDone.type === 'drink'
    ));
    setRecipeName(doneDrink);
  };

  const filterByType = () => {
    setRecipeName(doneRecipesLocalStorage);
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
          onClick={ doneFoods }
        >
          Food
        </button>
        <button
          name="Drinks"
          type="button"
          className="filter-done"
          data-testid="filter-by-drink-btn"
          onClick={ doneDrinks }
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
