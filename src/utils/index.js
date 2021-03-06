export const setIngredientsArray = (objRecipe) => Object.keys(objRecipe)
  .filter((key) => key.includes('strIngredient'))
  .reduce((cur, key) => {
    if (objRecipe[key]?.length)cur.push(objRecipe[key]);
    return cur;
  }, []);

export const setMeasureArray = (objRecipe) => Object.keys(objRecipe)
  .filter((key) => key.includes('strMeasure'))
  .reduce((cur, key) => {
    if (objRecipe[key] !== '')cur.push(objRecipe[key]);
    return cur;
  }, []);

// export const setIngredientsAndMeasureArray = ingredients.reduce((acc, cur, i) => {
//   acc.push({
//     ingrediente: cur,
//     measure: measure[i],
//   });
//   return acc;
// }, []);
