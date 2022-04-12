const DONE_RECIPES = 'doneRecipes';

if (!JSON.parse(localStorage.getItem(DONE_RECIPES))) {
  localStorage.setItem(
    DONE_RECIPES,
    JSON.stringify([]),
  );
}

const readLocalStorage = (key) => JSON
  .parse(localStorage.getItem(key));

const saveLocalStorage = (key, content) => localStorage.setItem(
  key,
  JSON.stringify(content),
);

export const getFromLocalStorage = (key) => readLocalStorage(key);

export const setRecipesDone = (recipe) => {
  if (recipe) {
    const key = 'doneRecipes';
    const recipesAlreadyDone = readLocalStorage(key);
    saveLocalStorage(key, [
      ...recipesAlreadyDone,
      { ...recipe },
    ]);
  }
};
