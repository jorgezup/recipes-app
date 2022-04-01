import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../css/Detail.css';

// const doneRecipes = [{}];
// const data = new Date();
let recipeStarted = {
  cocktails: {},
  meals: {},
};

const Details = ({ recipe, recommendations, history }) => {
  const [buttonShare, setButtonShare] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const handleClickCardRecomendation = (id) => {
    history.push(`/foods/${id}`);
  };
  //  RECEITAS FINALIZADAS
  // const sendDoneRecipe = () => {
  //   if (location === '/foods') {
  //     doneRecipes = [{
  //       id: recipe.idMeal,
  //       type: 'food',
  //       nationality: recipe.strArea,
  //       category: recipe.strCategory,
  //       alcoholicOrNot: '',
  //       name: recipe.name,
  //       image: recipe.image,
  //       doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
  //       tags: recipe.strTags,
  //     }];
  //     localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  //   } else {
  //     doneRecipes = [{
  //       id: recipe.idDrink,
  //       type: 'drink',
  //       nationality: '',
  //       category: recipe.strCategory,
  //       alcoholicOrNot: recipe.alcoholic,
  //       name: recipe.name,
  //       image: recipe.image,
  //       doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
  //       tags: [],
  //     }];
  //     localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  //   }
  // };
  const getFavoritesLocal = () => JSON.parse(localStorage.getItem('favoriteRecipes'))
  || [];

  useEffect(() => {
    const getFavorites = getFavoritesLocal()
      .some((favorite) => favorite.id.includes(recipe.idDrink));
    setFavorites(getFavorites);
  }, []);

  const inProgressRecipes = () => {
    recipeStarted = ({
      cocktails: {
        [recipe.idDrink]: [],
      },
      meals: {
        ...recipeStarted.meals,
      },
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
  };

  const clickStartRecipe = () => {
    inProgressRecipes();
    history.push(`/drinks/${recipe.idDrink}/in-progress`);
  };

  const shareButton = () => {
    clipboardCopy(`http://localhost:3000${history.location.pathname}`);
    setButtonShare(true);
  };

  const favoriteButton = () => {
    if (favorites) {
      const deleteFav = getFavoritesLocal()
        .filter((favorite) => favorite.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(deleteFav));
      setFavorites(!favorites);
    } else {
      const favoriteRecipes = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.alcoholic,
        name: recipe.name,
        image: recipe.image,
      };
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...getFavoritesLocal(), favoriteRecipes]));
      setFavorites(!favorites);
    }
  };

  return (
    <div style={ { width: '360px' } }>
      {recipe ? (
        <div>
          <h2 data-testid="recipe-title">{recipe.name}</h2>
          <img
            data-testid="recipe-photo"
            src={ recipe.image }
            alt={ `Imagem da receita ${recipe.name}` }
            style={ { width: '100%' } }
          />
          <button data-testid="share-btn" type="button" onClick={ shareButton }>
            <img src={ shareIcon } alt="icon-share" />
          </button>
          <button type="button" onClick={ favoriteButton }>
            <img
              data-testid="favorite-btn"
              src={ favorites ? blackHeart : whiteHeart }
              alt="icon-favorite"
            />
          </button>
          {
            buttonShare && <span>Link copied!</span>
          }
          {
            recipe.alcoholic
              ? <p data-testid="recipe-category">{recipe.alcoholic}</p>
              : <p data-testid="recipe-category">{recipe.strCategory}</p>
          }
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
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {recipe.videoId && (
            <iframe
              data-testid="video"
              title={ `Video sobre a receita ${recipe.name}` }
              src={ `https://www.youtube.com/embed/${recipe.videoId}` }
              frameBorder="0"
              width="100%"
            />
          )}

          <div className="recomended-drinks">
            {/* TODO Card para recomendaçoes */}
            {
              recommendations.map((recommendation, index) => (
                <button
                  type="button"
                  key={ index }
                  className="recomendation-cards"
                  data-testid={ `${index}-recomendation-card` }
                  onClick={ () => handleClickCardRecomendation(recommendation.id) }
                >
                  <p data-testid={ `${index}-recomendation-title` }>
                    {recommendation.name}
                  </p>
                  <img
                    src={ recommendation.image }
                    className="recomendation-image"
                    alt="recomendation-img"
                  />
                </button>
              ))
            }
          </div>
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ clickStartRecipe }
            style={ {
              position: 'fixed',
              bottom: 0,
            } }
          >
            Continue Recipe
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

Details.propTypes = {
  recipe: PropTypes.arrayOf(Object),
}.isRequired;

export default Details;
