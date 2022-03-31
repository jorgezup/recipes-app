import { fetchMealsCategory } from '../../services/api';

export const getMealsCategoriesAction = (categories) => ({
  type: 'GET_MEALS_CATEGORIES',
  categories,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getMealsCategoriesThunk = () => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const categories = await fetchMealsCategory();
    return dispatch(getMealsCategoriesAction(categories));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
