const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'))
|| [];

const setDoneRecipes = (doneRecipes) => {
  console.log('localStorage', getDoneRecipes());
  localStorage.setItem('doneRecipes',
    JSON.stringify([...getDoneRecipes(), doneRecipes]));
};

export default setDoneRecipes;
