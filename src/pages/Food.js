import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsFood from '../components/DetailsFood';
import Loading from '../components/Loading';

const LIMIT_DRINKS = 6;

const Food = () => {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState();
  const [recommendations, setRecommendations] = useState();

  const fetchRecipe = useCallback(async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const { meals } = await response.json();
    const objRecipe = meals[0];
    const ingredients = Object.keys(objRecipe)
      .filter((key) => key.includes('strIngredient'))
      .reduce((cur, key) => {
        if (objRecipe[key] !== '')cur.push(objRecipe[key]);
        return cur;
      }, []);
    const measure = Object.keys(objRecipe)
      .filter((key) => key.includes('strMeasure'))
      .reduce((cur, key) => {
        if (objRecipe[key] !== '')cur.push(objRecipe[key]);
        return cur;
      }, []);
    const ingredientsAndMeasure = ingredients.reduce((acc, cur, i) => {
      acc.push({
        ingrediente: cur,
        measure: measure[i],
      });
      return acc;
    }, []);
    const recipeObj = {
      ...objRecipe,
      ingredientsAndMeasure,
      videoId: objRecipe?.strYoutube.split('=')[1],
      name: objRecipe.strMeal,
      image: objRecipe.strMealThumb,
    };
    setRecipe(recipeObj);
  }, [id]);

  const fetchRecommendations = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    const filteredDrinks = drinks.slice(0, LIMIT_DRINKS);

    const recommendationFiltered = filteredDrinks.reduce((acc, cur) => {
      acc.push({
        name: cur.strDrink,
        image: cur.strDrinkThumb,
        id: cur.idDrink,
      });
      return acc;
    }, []);
    setRecommendations(recommendationFiltered);
  }, []);

  useEffect(() => {
    fetchRecipe();
    fetchRecommendations();
  }, [fetchRecipe, fetchRecommendations]);

  return (
    <div>
      {recipe && recommendations ? (<DetailsFood
        recipe={ recipe }
        history={ history }
        recommendations={ recommendations }
      />)
        : <Loading />}
    </div>);
};

Food.propTypes = {
  recipe: PropTypes.arrayOf(Object),
}.isRequired;

export default Food;
