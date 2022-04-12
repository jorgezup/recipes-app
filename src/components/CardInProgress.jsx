import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import {
  setMealInProgress,
  removeMealInProgress,
  getRecipesInProgress } from '../services/localStorage/recipesInProgress';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  getFromLocalStorage,
  removeRecipeFromFavorite,
  setRecipesInFavorite,
} from '../services/localStorage/favoriteRecipes';
import setDoneRecipes from '../services/localStorage/doneRecipes';
import '../css/InProgress.css';

const data = new Date();

const CardInProgress = ({ recipe }) => {
  const history = useHistory();
  const [ingredientNames, setIngredientNames] = useState([]);
  const [isRecipeShared, setIsRecipeShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const recipesAlreadyFavorited = getFromLocalStorage('favoriteRecipes');
    const isThisRecipeFavorite = recipesAlreadyFavorited
      .some(({ id }) => id === recipe.id);
    setIsFavorite(isThisRecipeFavorite);
  }, [recipe.id]);

  const ingredientFilter = (id, ingredient) => {
    if (!ingredientNames.includes(ingredient)) {
      setMealInProgress(id, ingredient);
    } else {
      removeMealInProgress(id, ingredient);
    }
  };

  const handleCheckIngredient = (id, ingredient) => {
    setIngredientNames([...ingredientNames, ingredient]);
    ingredientFilter(id, ingredient);
  };

  const path = history.location.pathname.split('/')[1];

  const handleShare = () => {
    clipboardCopy(`http://localhost:3000/${path}/${recipe.id}`);
    setIsRecipeShared(true);
  };

  const setRecipeFavorite = (recipeObject) => {
    setRecipesInFavorite(recipeObject);
  };

  const removeRecipeAsFavorite = (id) => {
    removeRecipeFromFavorite(id);
  };

  const handleFavorite = () => {
    if (isFavorite === false) {
      const recipeObject = {
        id: recipe.id,
        type: path === 'foods' ? 'food' : 'drink',
        nationality: recipe.nationality || '',
        category: recipe.category,
        alcoholicOrNot: recipe.alcoholic || '',
        name: recipe.title,
        image: recipe.image,
      };
      setRecipeFavorite(recipeObject);
      setIsFavorite(true);
    } else {
      removeRecipeAsFavorite(recipe.id);
      setIsFavorite(false);
    }
  };

  const sendDoneRecipe = () => {
    const doneRecipes = {
      id: recipe.id,
      type: path === 'foods' ? 'food' : 'drink',
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: '',
      name: recipe.title,
      image: recipe.image,
      doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
      tags: recipe.strTags?.split(','),
    };
    console.log(doneRecipes);
    setDoneRecipes(doneRecipes);
  };

  const isRecipeAlreadyFinished = () => ingredientNames.length;

  const handleFinishButton = () => {
    sendDoneRecipe();
    history.push('/done-recipes');
  };

  const { meals: local } = getRecipesInProgress();

  return (
    <div className="in-progress-container">
      <h3
        className="recipe-title"
        data-testid="recipe-title"
      >
        {recipe.title}

      </h3>
      <div className="img-shadow">
        <img
          data-testid="recipe-photo"
          src={ recipe.image }
          alt=""
          className="recipe-photo-progress"
        />
      </div>
      <p
        className="recipe-category"
        data-testid="recipe-category"
      >
        {recipe.category}

      </p>
      <div className="ingredients-container">
        <ul className="list">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              className="ingredient"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <label htmlFor={ ingredient }>
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ ingredient }
                  checked={ local[recipe.id]?.includes(ingredient) }
                  onChange={ () => handleCheckIngredient(recipe.id, ingredient) }
                />
                {ingredient}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {recipe.instructions}

      </p>
      <div className="share-favorites">
        <button type="button" onClick={ handleShare }>
          <img src={ shareIcon } data-testid="share-btn" alt="icon-share" />
        </button>
        {
          isRecipeShared && <span>Link copied!</span>
        }
        <button type="button" onClick={ handleFavorite }>
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeart : whiteHeart }
            alt="icon-favorite"
          />
        </button>
      </div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="finish-btn"
        disabled={
          isRecipeAlreadyFinished() < recipe.ingredients.length
        }
        onClick={ () => handleFinishButton() }
      >
        Finalizar
      </button>
    </div>
  );
};

CardInProgress.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default CardInProgress;
