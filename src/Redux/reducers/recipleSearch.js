const initialState = {};

function recipleSearch(state = initialState, action) {
  switch (action.type) {
  case 'SEARCH':
    return action.food;
  default:
    return state;
  }
}

export default recipleSearch;
