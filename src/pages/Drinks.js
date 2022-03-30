import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchDrink from '../components/RecipeSearchDrink';

const LIMIT_DRINKS = 12;

const Drinks = () => {
  const history = useHistory();
  const [twelveDrinks, setTwelveDrinks] = useState([]);
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { drinks } = useSelector((state) => state.recipeSearch);
  const { drinks: drinkByIngredients } = useSelector((state) => state.byIngredientsDrink);

  const fetchDrinks = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredDrinks = data.drinks.slice(0, LIMIT_DRINKS);
    setTwelveDrinks(filteredDrinks);
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return (
    <Layout title="Drinks">
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
          <Card
            index={ index }
            key={ drink.idDrink }
            image={ drink.strDrinkThumb }
            title={ drink.strDrink }
          />
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
