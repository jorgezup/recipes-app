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
    id: drinks[0]?.idDrink,
    title: drinks[0]?.strDrink,
    image: drinks[0]?.strDrinkThumb,
    category: drinks[0]?.strCategory,
    instructions: drinks[0]?.strInstructions,
    ingredients: setIngredientsArray(drinks[0] || {}),
    alcoholic: drinks[0]?.strAlcoholic,
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
