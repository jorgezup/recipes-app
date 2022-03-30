import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const endpointAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const ExploreDrinks = () => {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    const randomReciple = async () => {
      const { drinks } = await fetch(endpointAPI).then((response) => response.json());
      setRandomFood(drinks[0]);
    };
    randomReciple();
  }, []);

  console.log(randomFood.idMeal);
  const handleClickIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };
  const handleClickSurprise = () => {
    history.push(`/drinks/${randomFood.idDrink}`);
  };

  return (
    <Layout title="Explore Foods">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickIngredients }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClickSurprise }
      >
        Surprise me!
      </button>
    </Layout>
  );
};

export default ExploreDrinks;
