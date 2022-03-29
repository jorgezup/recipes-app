const initialState = false;

function searchClicked(state = initialState, action) {
  switch (action.type) {
  case 'SEARCH_CLICKED':
    return action.bool;
  default:
    return state;
  }
}

export default searchClicked;
