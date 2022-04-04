/*
{
    cocktails: {
        id-da-bebida: [lista-de-ingredientes-utilizados],
        ...
    },
    meals: {
        id-da-comida: [lista-de-ingredientes-utilizados],
        ...
    }
}
*/

const objRecipesInProgress = {
  cocktails: {},
  meals: {},
};

const RECIPES_IN_PROGRESS_KEY = 'inProgressRecipes';

if (!JSON.parse(localStorage.getItem(RECIPES_IN_PROGRESS_KEY))) {
  localStorage.setItem(
    RECIPES_IN_PROGRESS_KEY,
    JSON.stringify(objRecipesInProgress),
  );
}

const readRecipesInProgress = () => JSON
  .parse(localStorage.getItem(RECIPES_IN_PROGRESS_KEY));

const saveRecipesInProgress = (recipesInProgress) => localStorage.setItem(
  RECIPES_IN_PROGRESS_KEY,
  JSON.stringify(recipesInProgress),
);

export const getRecipesInProgress = () => readRecipesInProgress();

export const setRecipesInProgress = (recipe) => {
  if (recipe) {
    console.log('setRecipe', recipe);
    const recipesAlreadyInProgress = readRecipesInProgress();
    saveRecipesInProgress({
      ...recipesAlreadyInProgress,
      meals: [...ingredients, recipe.ingredient],
    });
  }
};

export const setCocktailInProgress = (cocktail) => {
  if (cocktail) {
    console.log('setRecipeCocktail', cocktail);
    const recipesAlreadyInProgress = readRecipesInProgress();
    saveRecipesInProgress({ ...recipesAlreadyInProgress, cocktails: cocktail });
  }
};

export const setMealInProgress = (id, ingredient) => {
  if (ingredient) {
    const prevState = readRecipesInProgress();
    if (!prevState.meals[id]) {
      prevState.meals = {
        ...prevState.meals,
        [id]: [],
      };
    }
    saveRecipesInProgress({
      ...prevState,
      meals: {
        ...prevState.meals,
        [id]: [...prevState.meals[id], ingredient],
      },
    });
  }
};

export const removeMealInProgress = (id, ingredient) => {
  const prevState = readRecipesInProgress();
  saveRecipesInProgress({
    ...prevState,
    meals: {
      ...prevState.meals,
      [id]: prevState.meals[id].filter((item) => item !== ingredient),
    },
  });
};
