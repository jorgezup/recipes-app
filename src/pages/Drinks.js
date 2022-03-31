import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchDrink from '../components/RecipeSearchDrink';

const LIMIT_DRINKS = 12;
const LIMIT_CATEGORIES = 5;

const Drinks = () => {
  const history = useHistory();
  const { location } = history;
  const [twelveDrinks, setTwelveDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [nameDrinkCategory, setNameDrinkCategory] = useState('');
  const [filteredDrink, setFilteredDrink] = useState([]);
  const searchClicked = useSelector((state) => state.searchClicked);
  const { drinks } = useSelector((state) => state.recipeSearch);
  const { drinks: drinkByIngredients } = useSelector((state) => state.byIngredientsDrink);

  const fetchDrinks = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredDrinks = data.drinks.slice(0, LIMIT_DRINKS);
    setFilteredDrink(filteredDrinks);
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

  const getByCategory = async (drinkCategory) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`);
    const data = await response.json();
    const reduceData = data.drinks.reduce((acc, curl, index) => {
      if (index < LIMIT_DRINKS) acc.push(curl);
      return acc;
    }, []);
    if (drinkCategory === nameDrinkCategory) {
      setTwelveDrinks(filteredDrink);
      setNameDrinkCategory('');
    }
    if (drinkCategory !== nameDrinkCategory) setTwelveDrinks(reduceData);
  };

  const buttonOfCategories = (drinkCategory) => {
    setNameDrinkCategory(drinkCategory);
    getByCategory(drinkCategory);
  };

  const buttonAll = () => {
    setTwelveDrinks(filteredDrink);
  };

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return (
    <Layout title="Drinks">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => buttonAll() }
      >
        All
      </button>
      {
        drinkCategories.map((category) => (
          <div key={ category.strCategory }>
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => buttonOfCategories(category.strCategory) }
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
      { (!searchClicked && !drinkByIngredients)
        ? (twelveDrinks.map((drink, index) => (
          <Link
            key={ drink.idDrink }
            to={ `/drinks/${drink.idDrink}` }
          >
            <Card
              index={ index }
              image={ drink.strDrinkThumb }
              title={ drink.strDrink }
            />
          </Link>
        ))) : (
          <RecipeSearchDrink
            recipes={ drinkByIngredients }
            history={ history }
          />
        )}
    </Layout>
  );
};

export default Drinks;
