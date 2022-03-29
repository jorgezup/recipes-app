import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';

const LIMIT_DRINKS = 12;

const Drinks = () => {
  const { location } = useHistory();
  const [allDrinks, setAllDrinks] = useState([]);

  const fetchDrinks = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredMeals = data.drinks.slice(0, LIMIT_DRINKS);
    setAllDrinks(filteredMeals);
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return (
    <Layout title="Drinks">
      <SearchHeader location={ location } />
      {
        allDrinks.map((drink, index) => (
          <Card
            index={ index }
            key={ drink.idDrink }
            image={ drink.strDrinkThumb }
            title={ drink.strDrink }
          />
        ))
      }
    </Layout>
  );
};

export default Drinks;
