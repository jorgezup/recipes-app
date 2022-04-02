import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchFood from '../components/RecipeSearchFood';
import { getMealsThunk } from '../Redux/actions/meals';
import { getMealsCategoriesThunk } from '../Redux/actions/mealsCategories';
import Loading from '../components/Loading';
import { fetchMealsByCategory } from '../services/api';

const LIMIT_MEALS = 12;
const LIMIT_CATEGORIES = 5;

const Foods = () => {
  const dispatch = useDispatch();
  const [nameFoodCategory, setNameFoodCategory] = useState('');
  const [twelveMeals, setTwelveMeals] = useState([]);

  const {
    meals,
    isFetching: isFetchingMeals,
  } = useSelector((state) => state.meals);
  const {
    categories,
    isFetching: isFetchingCategories,
  } = useSelector((state) => state.mealsCategories);
  const { meals: searchedMeals } = useSelector((state) => state.recipeSearch);
  const { meals: mealsByIngredients } = useSelector((state) => state.byIngredientsFood);

  useEffect(() => {
    setTwelveMeals(meals.slice(0, LIMIT_MEALS));
  }, [meals]);

  // const twelveMeals = meals.slice(0, LIMIT_MEALS);
  const twelveMealsArray = meals.slice(0, LIMIT_MEALS);
  const mealCategories = categories.slice(0, LIMIT_CATEGORIES);
  const twelveSearched = searchedMeals?.slice(0, LIMIT_MEALS);

  const getByCategory = async (foodCategory) => {
    const { meals: mealsByCategory } = await fetchMealsByCategory(foodCategory);
    const reduceData = mealsByCategory.reduce((acc, curl, index) => {
      if (index < LIMIT_MEALS) acc.push(curl);
      return acc;
    }, []);

    if (foodCategory === nameFoodCategory) {
      setTwelveMeals(twelveMealsArray);
      setNameFoodCategory('');
    }
    if (foodCategory !== nameFoodCategory) setTwelveMeals(reduceData);
  };

  const buttonOfCategories = (foodCategory) => {
    setNameFoodCategory(foodCategory);
    getByCategory(foodCategory);
  };

  const buttonAll = () => {
    setTwelveMeals(twelveMealsArray);
  };

  useEffect(() => {
    dispatch(getMealsThunk());
    dispatch(getMealsCategoriesThunk());
  }, [dispatch]);

  return (
    <Layout title="Foods">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => buttonAll() }
      >
        All
      </button>
      <div>
        {
          isFetchingCategories ? <Loading />
            : mealCategories.map((category) => (
              <span key={ category.strCategory }>
                <button
                  type="button"
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => buttonOfCategories(category.strCategory) }
                >
                  { category.strCategory }
                </button>
              </span>))
        }
      </div>
      {isFetchingMeals && <Loading />}
      {
        !twelveSearched && !mealsByIngredients
          && twelveMeals.map((food, index) => (
            <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
              <Card
                index={ index }
                image={ food.strMealThumb }
                title={ food.strMeal }
              />
            </Link>
          ))
      }
      {
        (twelveSearched || mealsByIngredients)
          && (
            <RecipeSearchFood
              recipes={ twelveSearched || mealsByIngredients }
            />
          )
      }
    </Layout>
  );
};

export default Foods;
