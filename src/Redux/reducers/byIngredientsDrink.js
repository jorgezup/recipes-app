const initialState = {};

function byIngredientsDrink(state = initialState, action) {
  switch (action.type) {
  case 'BY_INGREDIENT_DRINK':
    return action.ingredient;
  default:
    return state;
  }
}

export default byIngredientsDrink;
