const initialState = false;

function filteredClicked(state = initialState, action) {
  switch (action.type) {
  case 'FILTER_CLICKED':
    return action.bool;
  default:
    return state;
  }
}

export default filteredClicked;
