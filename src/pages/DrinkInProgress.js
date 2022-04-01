import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardInProgress from '../components/CardInProgress';
import { getDrinkByIdThunk } from '../Redux/actions/drinkById';
import Loading from '../components/Loading';
import { setIngredientsArray } from '../utils';

const DrinkInProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { drinks, isFetching } = useSelector((state) => state.drinkById);

  const recipe = {
    title: drinks[0]?.strMeal,
    image: drinks[0]?.strMealThumb,
    category: drinks[0]?.strCategory,
    instructions: drinks[0]?.strInstructions,
    ingredients: setIngredientsArray(drinks[0] || {}),
  };

  useEffect(() => {
    dispatch(getDrinkByIdThunk(id));
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

export default DrinkInProgress;
