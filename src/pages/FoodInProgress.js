import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardInProgress from '../components/CardInProgress';
import { getMealByIdThunk } from '../Redux/actions/mealById';
import Loading from '../components/Loading';
import { setIngredientsArray } from '../utils';

const FoodInProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals, isFetching } = useSelector((state) => state.mealById);

  const recipe = {
    id: meals[0]?.idMeal,
    title: meals[0]?.strMeal,
    image: meals[0]?.strMealThumb,
    category: meals[0]?.strCategory,
    instructions: meals[0]?.strInstructions,
    ingredients: setIngredientsArray(meals[0] || {}),
    nationality: meals[0]?.strArea,
  };

  useEffect(() => {
    dispatch(getMealByIdThunk(id));
  }, [dispatch, id]);

  return (
    <div>
      {
        isFetching ? <Loading />
          : <CardInProgress recipe={ recipe || {} } />
      }
    </div>
  );
};

export default FoodInProgress;
