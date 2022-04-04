/*
[{
    id: id-da-receita,
    type: food-ou-drink,
    nationality: nacionalidade-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}]
*/
const FAVORITE_RECIPES = 'favoriteRecipes';

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES))) {
  localStorage.setItem(
    FAVORITE_RECIPES,
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

export const setRecipesInFavorite = (recipe) => {
  if (recipe) {
    const key = 'favoriteRecipes';
    console.log('setRecipe', recipe);
    const recipesAlreadyInFavorites = readLocalStorage(key);
    saveLocalStorage(key, [
      ...recipesAlreadyInFavorites,
      { ...recipe },
    ]);
  }
};

export const removeRecipeFromFavorite = (id) => {
  if (id) {
    console.log('setRecipe', id);
    const key = 'favoriteRecipes';
    const recipesAlreadyInFavorites = readLocalStorage(key);
    console.log(recipesAlreadyInFavorites);
    const filtered = recipesAlreadyInFavorites.filter((recipe) => recipe.id !== id);
    saveLocalStorage(key, [...filtered]);
  }
};
