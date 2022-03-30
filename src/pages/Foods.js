import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchFood from '../components/RecipeSearchFood';

const LIMIT_MEALS = 12;
const LIMIT_CATEGORIES = 5;

const Foods = () => {
  const history = useHistory();
  const { location } = history;
  const [twelveRecipes, setTwelveRecipes] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const searchClicked = useSelector((state) => state.searchClicked);
  const { meals } = useSelector((state) => state.recipeSearch);
  const { meals: mealsByIngredients } = useSelector((state) => state.byIngredientsFood);
  console.log(mealsByIngredients);
  const fetchRecipes = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredMeals = data.meals.slice(0, LIMIT_MEALS);
    setTwelveRecipes(filteredMeals);
  }, []);

  useEffect(() => {
    const getFoodsCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const reduceData = data.meals.reduce((acc, curl, index) => {
        if (index < LIMIT_CATEGORIES) acc.push(curl);
        return acc;
      }, []);
      setFoodCategories(reduceData);
    };
    getFoodsCategories();
  }, []);

  const getByCategory = async () => {
    const response = await fetch('http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    const data = await response.json();
    console.log(data);
  };

  const buttonOfCategories = (foodCategory) => {
    console.log(foodCategory);
    getByCategory();
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Layout title="Foods">
      {
        foodCategories.map((category) => (
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
        meals
        && (
          <RecipeSearchFood
            recipes={ meals }
            history={ history }
          />
        )
      }
      { (!searchClicked && !mealsByIngredients)
        ? (twelveRecipes.map((recipe, index) => (
          <Card
            index={ index }
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
          />
        ))) : (
          <RecipeSearchFood
            recipes={ mealsByIngredients }
            history={ history }
          />
        )}

    </Layout>
  );
};

export default Foods;
