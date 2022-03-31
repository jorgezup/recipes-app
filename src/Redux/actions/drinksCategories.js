import { fetchDrinksCategory } from '../../services/api';

export const getDrinksCategoriesAction = (categories) => ({
  type: 'GET_DRINKS_CATEGORIES',
  categories,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getDrinksCategoriesThunk = () => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const categories = await fetchDrinksCategory();
    return dispatch(getDrinksCategoriesAction(categories));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
