export const LOGIN = 'LOGIN';
const noRecipeFound = 'Sorry, we haven\'t found any recipes for these filters.';

export const emailValidation = (email) => ({ type: LOGIN, email });

const foodsAPI = (food) => ({
  type: 'SEARCH',
  food,
});

export const buttonSearchClicked = (payload) => ({
  type: 'SEARCH_CLICKED',
  payload,
});

const foodsByIngredient = (ingredient) => ({
  type: 'BY_INGREDIENT_FOOD',
  ingredient,
});

const drinksByIngredient = (ingredient) => ({
  type: 'BY_INGREDIENT_DRINK',
  ingredient,
});

export const foodSearchAPI = (searchRecipe, radio, exactLocation) => (dispatch) => {
  let url = '';
  if (exactLocation === '/foods') {
    if (radio === 'nameSearch') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipe}`;
    }

    if (radio === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRecipe}`;
    }

    if (radio === 'firstLetter') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchRecipe}`;
    }

    return (
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals === null) {
            global.alert(noRecipeFound);
          }
          dispatch(foodsAPI(data));
        })
    );
  }
};

export const drinkSearchAPI = (searchRecipe, radio, exactLocation) => (dispatch) => {
  let url = '';
  if (exactLocation === '/drinks') {
    if (radio === 'nameSearch') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchRecipe}`;
    }

    if (radio === 'ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchRecipe}`;
    }

    if (radio === 'firstLetter') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchRecipe}`;
    }

    return (
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.drinks === null) {
            global.alert(noRecipeFound);
          }
          dispatch(foodsAPI(data));
        })
    );
  }
};

export const foodByIngredient = (searchRecipe) => (dispatch) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRecipe}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals === null) {
        global.alert(noRecipeFound);
      }
      dispatch(foodsByIngredient(data));
    })
);

export const drinkByIngredients = (searchRecipe) => (dispatch) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchRecipe}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals === null) {
        global.alert(noRecipeFound);
      }
      dispatch(drinksByIngredient(data));
    })
);
