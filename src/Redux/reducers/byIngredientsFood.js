const initialState = {};

function byIngredientsFood(state = initialState, action) {
  switch (action.type) {
  case 'BY_INGREDIENT_FOOD':
    return action.ingredient;
  default:
    return state;
  }
}

export default byIngredientsFood;
