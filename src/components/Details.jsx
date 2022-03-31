import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import '../css/Detail.css';

const Details = ({ recipe, recommendations, history, location }) => {
  const handleClickCardRecomendation = (id) => {
    history.push(`${location}/${id}`);
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
          <button data-testid="share-btn" type="button">
            Compartilhar
          </button>
          <button data-testid="favorite-btn" type="button">
            Favoritar
          </button>
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
          <button data-testid="start-recipe-btn" type="button">
            Iniciar Receita
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
