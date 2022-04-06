import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Explore.css';

const endpointAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';

const ExploreFoods = () => {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    const randomRecipe = async () => {
      const { meals } = await fetch(endpointAPI).then((response) => response.json());
      setRandomFood(meals[0]);
    };
    randomRecipe();
  }, []);

  const handleClickIngredients = () => {
    history.push('/explore/foods/ingredients');
  };
  const handleClickNationality = () => {
    history.push('/explore/foods/nationalities');
  };
  const handleClickSurprise = () => {
    history.push(`/foods/${randomFood.idMeal}`);
  };

  return (
    <Layout title="Explore Foods">
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
          data-testid="explore-by-nationality"
          onClick={ handleClickNationality }
        >
          By Nationality
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

export default ExploreFoods;
