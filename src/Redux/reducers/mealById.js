const INITIAL_STATE = {
  isFetching: false,
  error: '',
  meals: [],
};

const mealByIdReducer = (state = INITIAL_STATE, { type, meals, error }) => {
  switch (type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error };
  case 'GET_MEAL_BY_ID':
    return { ...state, isFetching: false, meals };
  default:
    return state;
  }
};

export default mealByIdReducer;
