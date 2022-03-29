import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const endpointAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';

const ExploreFoods = () => {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    const randomReciple = async () => {
      const { meals } = await fetch(endpointAPI).then((response) => response.json());
      setRandomFood(meals[0]);
    };
    randomReciple();
  }, []);

  console.log(randomFood.idMeal);
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
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickIngredients }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ handleClickNationality }
      >
        By Nationality
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

export default ExploreFoods;
