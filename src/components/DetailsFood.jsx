import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/Detail.css';

// const doneRecipes = [{}];
// const data = new Date();
let recipeStarted = {
  cocktails: {},
  meals: {},
};

const DetailsFood = ({ recipe, recommendations, history }) => {
  const [buttonShare, setButtonShare] = useState(false);
  const [favorites, setFavorites] = useState(false);
  // const handleClickCardRecomendation = (id) => {
  //   history.push(`/drinks/${id}`);
  // };

  const getFavoritesLocal = () => JSON.parse(localStorage.getItem('favoriteRecipes'))
  || [];

  useEffect(() => {
    const getFavorites = getFavoritesLocal()
      .some((favorite) => favorite.id.includes(recipe.idMeal));
    setFavorites(getFavorites);
  }, []);

  const inProgressRecipes = () => {
    recipeStarted = ({
      cocktails: { ...recipeStarted.cocktails },
      meals: {
        [recipe.idMeal]: [],
      },
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
  };

  const clickStartRecipe = () => {
    inProgressRecipes();
    history.push(`/foods/${recipe.idMeal}/in-progress`);
  };

  const shareButton = () => {
    clipboardCopy(`http://localhost:3000${history.location.pathname}`);
    setButtonShare(true);
  };

  const favoriteButton = () => {
    if (favorites) {
      const deleteFav = getFavoritesLocal()
        .filter((favorite) => favorite.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(deleteFav));
      setFavorites(!favorites);
    } else {
      const favoriteRecipes = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.name,
        image: recipe.image,
      };
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...getFavoritesLocal(), favoriteRecipes]));
      setFavorites(!favorites);
    }
  };

  return (
    <div className="container">
      {recipe ? (
        <div>
          <div className="details-container">
            <h2 data-testid="recipe-title">{recipe.name}</h2>
            <div className="img-shadow">
              <img
                data-testid="recipe-photo"
                className="recipe-photo"
                src={ recipe.image }
                alt={ `Imagem da receita ${recipe.name}` }
              />
            </div>
            <div className="share-favorite">
              <button data-testid="share-btn" type="button" onClick={ shareButton }>
                <img src={ shareIcon } alt="icon-share" />
              </button>
              <button type="button" onClick={ favoriteButton }>
                <img
                  data-testid="favorite-btn"
                  src={ favorites ? blackHeartIcon : whiteHeartIcon }
                  alt="icon-favorite"
                />
              </button>
            </div>
            {
              buttonShare && <span>Link copied!</span>
            }
            {
              recipe.alcoholic
                ? <p data-testid="recipe-category">{recipe.alcoholic}</p>
                : <p data-testid="recipe-category">{recipe.strCategory}</p>
            }
            <div className="recipe">
              <ul>
                {recipe.ingredientsAndMeasure.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient.ingrediente} ${ingredient.measure || ''} `}
                  </li>
                ))}
              </ul>
              <p
                className="how-to-do"
                data-testid="instructions"
              >
                {recipe.strInstructions}

              </p>

            </div>

            {recipe.videoId && (
              <iframe
                data-testid="video"
                title={ `Video sobre a receita ${recipe.name}` }
                src={ `https://www.youtube.com/embed/${recipe.videoId}` }
                frameBorder="0"
                width="100%"
              />
            )}
          </div>

          <div className="recomended-drinks">
            {/* TODO Card para recomendaçoes */}
            {
              recommendations.map((recommendation, index) => (
                <Link
                  to={ `/drinks/${recommendation.id}` }
                  key={ index }
                  className="recomendation-cards"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <div>
                    <p data-testid={ `${index}-recomendation-title` }>
                      {recommendation.name}
                    </p>
                    <img
                      src={ recommendation.image }
                      className="recomendation-image"
                      alt="recomendation-img"
                    />
                  </div>
                </Link>
              ))
            }
          </div>
          <div className="button-start-container">
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="button-start"
              onClick={ clickStartRecipe }
            >
              Continue Recipe
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

DetailsFood.propTypes = {
  recipe: PropTypes.arrayOf(Object),
  recommendations: PropTypes.arrayOf(Object),
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DetailsFood;
