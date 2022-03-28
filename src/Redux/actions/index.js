
export const LOGIN = 'LOGIN';

export const emailValidation = (email) => ({ type: LOGIN, email });

const foodsAPI = (food) => ({
  type: 'FOOD',
  food,
});

export const requestAPI = (searchRecipe, radio, exactLocation) => (dispatch) => {
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
          dispatch(foodsAPI(data));
        })
    );
  }

  if (exactLocation === '/drinks') {
    if (radio === 'nameSearch') {
      url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchRecipe}`;
    }

    if (radio === 'ingredient') {
      console.log('entrou');
      url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchRecipe}`;
    }

    if (radio === 'firstLetter') {
      url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchRecipe}`;
    }

    return (
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch(foodsAPI(data));
        })
    );
  }
};
