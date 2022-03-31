const INITIAL_STATE = {
  isFetching: false,
  error: '',
  drinks: [],
};

const drinksReducer = (state = INITIAL_STATE, { type, drinks, error }) => {
  switch (type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error };
  case 'GET_DRINKS':
    return { ...state, isFetching: false, drinks };
  default:
    return state;
  }
};

export default drinksReducer;
