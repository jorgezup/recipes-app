import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsDrink from '../components/DetailsDrink';
import Loading from '../components/Loading';

const LIMIT_DRINKS = 6;

const Drink = () => {
  const { id } = useParams();
  const history = useHistory();
  // const { location } = history;
  const [drink, setDrink] = useState();
  const [recommendations, setRecommendations] = useState();

  const fetchDrink = useCallback(async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const { drinks } = await response.json();
    const objDrink = drinks[0];
    const ingredients = Object.keys(objDrink)
      .filter((key) => key.includes('strIngredient'))
      .reduce((cur, key) => {
        if (objDrink[key] !== null) cur.push(objDrink[key]);
        return cur;
      }, []);
    const measure = Object.keys(objDrink)
      .filter((key) => key.includes('strMeasure'))
      .reduce((cur, key) => {
        if (objDrink[key] !== null) cur.push(objDrink[key]);
        return cur;
      }, []);
    const ingredientsAndMeasure = ingredients.reduce((acc, cur, i) => {
      acc.push({
        ingrediente: cur,
        measure: measure[i],
      });
      return acc;
    }, []);
    const drinkObj = {
      ...objDrink,
      ingredientsAndMeasure,
      image: objDrink.strDrinkThumb,
      name: objDrink.strDrink,
      alcoholic: objDrink.strAlcoholic,
    };
    setDrink(drinkObj);
  }, [id]);

  const fetchRecommendations = useCallback(async () => {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    const { meals } = await response.json();
    const filteredDrinks = meals.slice(0, LIMIT_DRINKS);

    const recommendationFiltered = filteredDrinks.reduce((acc, cur) => {
      acc.push({
        name: cur.strMeal,
        image: cur.strMealThumb,
        id: cur.idMeal,
      });
      return acc;
    }, []);
    setRecommendations(recommendationFiltered);
  }, []);

  useEffect(() => {
    fetchDrink();
    fetchRecommendations();
  }, [fetchDrink, fetchRecommendations]);

  return (
    <div>
      {drink && recommendations ? (<DetailsDrink
        recipe={ drink }
        history={ history }
        recommendations={ recommendations }
      />
      ) : (
        <Loading />
      )}
    </div>
  );
};

Drink.propTypes = {
  drink: PropTypes.arrayOf(Object),
}.isRequired;

export default Drink;
