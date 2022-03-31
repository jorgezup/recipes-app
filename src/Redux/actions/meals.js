import { fetchMealsApi } from '../../services/api';

export const getMealsAction = (meals) => ({
  type: 'GET_MEALS',
  meals,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getMealsThunk = () => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const meals = await fetchMealsApi();
    return dispatch(getMealsAction(meals));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
