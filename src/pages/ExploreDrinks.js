import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Explore.css';

const endpointAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const ExploreDrinks = () => {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    const randomRecipe = async () => {
      const { drinks } = await fetch(endpointAPI).then((response) => response.json());
      setRandomFood(drinks[0]);
    };
    randomRecipe();
  }, []);

  const handleClickIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };
  const handleClickSurprise = () => {
    history.push(`/drinks/${randomFood.idDrink}`);
  };

  return (
    <Layout title="Explore Drinks">
      <div className="explore-container">

        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-ingredient"
          onClick={ handleClickIngredients }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-surprise"
          onClick={ handleClickSurprise }
        >
          Surprise me!
        </button>
      </div>
    </Layout>
  );
};

export default ExploreDrinks;
