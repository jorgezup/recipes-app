import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchDrink from '../components/RecipeSearchDrink';

const LIMIT_DRINKS = 12;
const LIMIT_CATEGORIES = 5;

const Drinks = () => {
  const history = useHistory();
  const [twelveDrinks, setTwelveDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { drinks } = useSelector((state) => state.recipeSearch);

  const fetchDrinks = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredDrinks = data.drinks.slice(0, LIMIT_DRINKS);
    setTwelveDrinks(filteredDrinks);
  }, []);

  useEffect(() => {
    const getDrinksCategories = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const reduceData = data.drinks.reduce((acc, curl, index) => {
        if (index < LIMIT_CATEGORIES) acc.push(curl);
        return acc;
      }, []);
      setDrinkCategories(reduceData);
    };
    getDrinksCategories();
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return (
    <Layout title="Drinks">
      {
        drinkCategories.map((category) => (
          <div key={ category.strCategory }>
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              { category.strCategory }
            </button>
          </div>))
      }
      {searchClicked && <SearchHeader location={ location } />}
      {
        drinks
        && (
          <RecipeSearchDrink
            recipes={ drinks }
            history={ history }
          />
        )
      }
      { !searchClicked
        && twelveDrinks.map((drink, index) => (
          <Card
            index={ index }
            key={ drink.idDrink }
            image={ drink.strDrinkThumb }
            title={ drink.strDrink }
          />
        ))}
    </Layout>
  );
};

export default Drinks;
