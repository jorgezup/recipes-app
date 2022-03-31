const initialState = {
  searchRecipe: '',
  radio: '',
  isClicked: false,
};

function searchClicked(state = initialState, action) {
  switch (action.type) {
  case 'SEARCH_CLICKED':
    return action.payload;
  default:
    return state;
  }
}

export default searchClicked;
