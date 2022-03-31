const INITIAL_STATE = {
  isFetching: false,
  error: '',
  meals: [],
};

const mealsReducer = (state = INITIAL_STATE, { type, meals, error }) => {
  switch (type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error };
  case 'GET_MEALS':
    return { ...state, isFetching: false, meals };
  default:
    return state;
  }
};

export default mealsReducer;
