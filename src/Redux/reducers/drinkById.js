const INITIAL_STATE = {
  isFetching: false,
  error: '',
  drinks: [],
};

const drinkByIdReducer = (state = INITIAL_STATE, { type, drinks, error }) => {
  switch (type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'REQUEST_FAILED':
    return { ...state, isFetching: false, error };
  case 'GET_DRINK_BY_ID':
    return { ...state, isFetching: false, drinks };
  default:
    return state;
  }
};

export default drinkByIdReducer;
