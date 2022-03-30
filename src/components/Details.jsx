import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';

const Details = ({ recipe, recommendations }) => {
  console.log(recommendations);
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

          <div>Recommended Drinks</div>
          {/* TODO Card para recomendaçoes */}
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={ index } data-testid={ `${index}-recomendation-card` }>
                <span data-testid={ `${index}-recomendation-title` }>
                  {recommendation.name}
                </span>
              </li>
            ))}
          </ul>
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
