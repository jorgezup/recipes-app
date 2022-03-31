const INITIAL_STATE = {
  isFetching: false,
  error: '',
  categories: [],
};

const categoriesMealsReducer = (state = INITIAL_STATE, { type, categories, error }) => {
  switch (type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error };
  case 'GET_MEALS_CATEGORIES':
    return { ...state, isFetching: false, categories };
  default:
    return state;
  }
};

export default categoriesMealsReducer;
