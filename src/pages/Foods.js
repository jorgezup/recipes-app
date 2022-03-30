import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchFood from '../components/RecipeSearchFood';

const LIMIT_MEALS = 12;

const Foods = () => {
  const history = useHistory();
  const [twelveRecipes, setTwelveRecipes] = useState([]);
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { meals } = useSelector((state) => state.recipeSearch);

  const fetchRecipes = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredMeals = data.meals.slice(0, LIMIT_MEALS);
    setTwelveRecipes(filteredMeals);
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Layout title="Foods">
      {searchClicked && <SearchHeader location={ location } />}
      {
        meals
        && (
          <RecipeSearchFood
            recipes={ meals }
            history={ history }
          />
        )
      }
      { !searchClicked
        && twelveRecipes.map((recipe, index) => (
          <Card
            index={ index }
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
          />
        ))}

    </Layout>
  );
};

export default Foods;
