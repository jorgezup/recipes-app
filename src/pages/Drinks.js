import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Card from '../components/Card';
import RecipeSearchDrink from '../components/RecipeSearchDrink';
import { getDrinksThunk } from '../Redux/actions/drinks';
import { getDrinksCategoriesThunk } from '../Redux/actions/drinksCategories';
import { fetchDrinksByCategory } from '../services/api';
import '../css/Drinks.css';

const LIMIT_DRINKS = 12;
const LIMIT_CATEGORIES = 5;

const Drinks = () => {
  const dispatch = useDispatch();
  const [nameDrinkCategory, setNameDrinkCategory] = useState('');
  const [twelveDrinks, setTwelveDrinks] = useState([]);

  const {
    drinks,
    isFetching: isFetchingDrinks,
  } = useSelector((state) => state.drinks);
  const {
    categories,
    isFetching: isFetchingCategories,
  } = useSelector((state) => state.drinksCategories);
  const { drinks: searchedDrinks } = useSelector((state) => state.recipeSearch);
  const { drinks: drinkByIngredients } = useSelector((state) => state.byIngredientsDrink);

  const twelveDrinksArray = drinks.slice(0, LIMIT_DRINKS);
  const drinkCategories = categories.slice(0, LIMIT_CATEGORIES);
  const twelveSearched = searchedDrinks?.slice(0, LIMIT_DRINKS);
  const twelveByIngredients = drinkByIngredients?.slice(0, LIMIT_DRINKS);

  useEffect(() => {
    setTwelveDrinks(drinks.slice(0, LIMIT_DRINKS));
  }, [drinks]);

  const getByCategory = async (drinkCategory) => {
    const { drinks: drinksByCategory } = await fetchDrinksByCategory(drinkCategory);
    const reduceData = drinksByCategory.reduce((acc, curl, index) => {
      if (index < LIMIT_DRINKS) acc.push(curl);
      return acc;
    }, []);

    if (drinkCategory === nameDrinkCategory) {
      setTwelveDrinks(twelveDrinksArray);
      setNameDrinkCategory('');
    }
    if (drinkCategory !== nameDrinkCategory) setTwelveDrinks(reduceData);
  };

  const buttonOfCategories = (drinkCategory) => {
    setNameDrinkCategory(drinkCategory);
    getByCategory(drinkCategory);
  };

  const buttonAll = () => {
    setTwelveDrinks(twelveDrinksArray);
  };

  useEffect(() => {
    dispatch(getDrinksThunk());
    dispatch(getDrinksCategoriesThunk());
  }, [dispatch]);

  return (
    <Layout title="Drinks">
      <div className="categories-drinks">
        <button
          type="button"
          className="categories"
          data-testid="All-category-filter"
          onClick={ () => buttonAll() }
        >
          All
        </button>
        <div>
          {
            isFetchingCategories ? <Loading />
              : drinkCategories.map((category) => (
                <span key={ category.strCategory }>
                  <button
                    type="button"
                    className="categories"
                    data-testid={ `${category.strCategory}-category-filter` }
                    onClick={ () => buttonOfCategories(category.strCategory) }
                  >
                    { category.strCategory }
                  </button>
                </span>))
          }
        </div>
        {isFetchingDrinks && <Loading />}
        {
          !twelveSearched && !twelveByIngredients
          && twelveDrinks.map((drink, index) => (
            <Link
              className="link-card-drinks"
              key={ drink.idDrink }
              to={ `/drinks/${drink.idDrink}` }
            >
              <Card
                index={ index }
                image={ drink.strDrinkThumb }
                title={ drink.strDrink }
              />
            </Link>
          ))
        }
        {
        /* TODO -> pensar sobre reutilizar o componente de Card
        não é necessário o uso deste componente RecipeSearchDrink */
          (twelveSearched || twelveByIngredients)
          && (
            <RecipeSearchDrink
              recipes={ twelveSearched || twelveByIngredients }
            />
          )
        }
      </div>
    </Layout>
  );
};

export default Drinks;
