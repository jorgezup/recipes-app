import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecipeSearchFood from '../components/RecipeSearchFood';
import { getMealsThunk } from '../Redux/actions/meals';
import { getMealsCategoriesThunk } from '../Redux/actions/mealsCategories';
import Loading from '../components/Loading';

const LIMIT_MEALS = 12;
const LIMIT_CATEGORIES = 5;

const Foods = () => {
  const dispatch = useDispatch();

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

  const twelveMeals = meals.slice(0, LIMIT_MEALS);
  const mealCategories = categories.slice(0, LIMIT_CATEGORIES);
  const twelveSearched = searchedMeals?.slice(0, LIMIT_MEALS);

  useEffect(() => {
    dispatch(getMealsThunk());
    dispatch(getMealsCategoriesThunk());
  }, [dispatch]);

  const getByCategory = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    const data = await response.json();
    console.log(data);
  };

  const buttonOfCategories = (foodCategory) => {
    console.log(foodCategory);
    getByCategory();
  };

  return (
    <Layout title="Foods">
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
        /* TODO -> pensar sobre reutilizar o componente de Card
        não é necessário o uso deste componente RecipeSearchDrink */
        (twelveSearched || mealsByIngredients)
          && (
            <RecipeSearchFood
              recipes={ twelveSearched || mealsByIngredients }
            />
          )
      }
      {/* {
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
        )} */}

    </Layout>
  );
};

export default Foods;
