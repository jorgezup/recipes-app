export const LOGIN = 'LOGIN';

export const emailValidation = (email) => ({ type: LOGIN, email });

const foodsAPI = (food) => ({
  type: 'SEARCH',
  food,
});

export const buttonSearchClicked = (bool) => ({
  type: 'SEARCH_CLICKED',
  bool,
});

export const buttonFilteredClicked = (bool) => ({
  type: 'FILTER_CLICKED',
  bool,
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
          console.log(data);
          if (data.meals === null) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
      console.log('entrou');
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchRecipe}`;
    }

    if (radio === 'firstLetter') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchRecipe}`;
    }

    return (
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          dispatch(foodsAPI(data));
        })
    );
  }
};
