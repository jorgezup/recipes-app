import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const [nameFoodCategory, setNameFoodCategory] = useState('');
  const [filteredMeal, setFilteredMeal] = useState([]);
  const searchClicked = useSelector((state) => state.searchClicked);
  const { meals } = useSelector((state) => state.recipeSearch);
  const { meals: mealsByIngredients } = useSelector((state) => state.byIngredientsFood);

  const fetchRecipes = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filteredMeals = data.meals.slice(0, LIMIT_MEALS);
    setFilteredMeal(filteredMeals);
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

  const getByCategory = async (foodCategory) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`);
    const data = await response.json();
    const reduceData = data.meals.reduce((acc, curl, index) => {
      if (index < LIMIT_MEALS) acc.push(curl);
      return acc;
    }, []);
    if (foodCategory === nameFoodCategory) {
      setTwelveRecipes(filteredMeal);
      setNameFoodCategory('');
    }
    if (foodCategory !== nameFoodCategory) setTwelveRecipes(reduceData);
  };

  const buttonOfCategories = (foodCategory) => {
    setNameFoodCategory(foodCategory);
    getByCategory(foodCategory);
  };

  const buttonAll = () => {
    setTwelveRecipes(filteredMeal);
    twelveRecipes.forEach((teste) => {
      console.log(teste);
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Layout title="Foods">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => buttonAll() }
      >
        All
      </button>
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
          <Link
            key={ recipe.idMeal }
            to={ `/foods/${recipe.idMeal}` }
          >
            <Card
              index={ index }
              image={ recipe.strMealThumb }
              title={ recipe.strMeal }
            />
          </Link>
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
