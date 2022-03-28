const initialState = {};

function foodsSearch(state = initialState, action) {
  switch (action.type) {
  case 'FOOD':
    return action.food;
  default:
    return state;
  }
}

export default foodsSearch;
