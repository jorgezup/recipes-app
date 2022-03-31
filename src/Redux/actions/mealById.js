import { fetchMealById } from '../../services/api';

export const getMealByIdAction = (meals) => ({
  type: 'GET_MEAL_BY_ID',
  meals,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getMealByIdThunk = (idMeal) => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const meals = await fetchMealById(idMeal);
    return dispatch(getMealByIdAction(meals));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
