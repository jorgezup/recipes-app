import { fetchDrinkById } from '../../services/api';

export const getDrinkByIdAction = (drinks) => ({
  type: 'GET_DRINK_BY_ID',
  drinks,
});

export const requestApiAction = () => ({
  type: 'REQUEST_API',
});

export const requestFailedAction = (error) => ({
  type: 'REQUEST_FAILED',
  error,
});

export const getDrinkByIdThunk = (idDrink) => async (dispatch) => {
  try {
    dispatch(requestApiAction());
    const drinks = await fetchDrinkById(idDrink);
    return dispatch(getDrinkByIdAction(drinks));
  } catch (error) {
    return dispatch(requestFailedAction(error.message));
  }
};
