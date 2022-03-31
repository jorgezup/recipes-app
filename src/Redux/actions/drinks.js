import { fetchDrinksApi } from '../../services/api';

export const getDrinksAction = (drinks) => ({
  type: 'GET_DRINKS',
  drinks,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getDrinksThunk = () => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const drinks = await fetchDrinksApi();
    return dispatch(getDrinksAction(drinks));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
