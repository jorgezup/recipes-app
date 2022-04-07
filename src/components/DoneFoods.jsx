import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../css/DoneRecipes.css';

const DoneFoods = ({ recipe, index }) => {
  const [isCopied, setIsCopied] = useState(false);

  const clickCopyButton = () => {
    clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
    setIsCopied(true);
  };

  return (
    <section className="done-recipe" key={ recipe.id }>
      <Link
        className="done-card"
        to={ `/foods/${recipe.id}` }
      >
        <h2
          className="name-done"
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }

        </h2>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          className="done-recipe-image"
        />
      </Link>
      <div className="info-done">
        <h3 className="type-name" data-testid={ `${index}-horizontal-top-text` }>
          { recipe.nationality }
          { ' - ' }
          { recipe.category }
        </h3>
        <p
          className="type-name"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { recipe.doneDate }

        </p>
        {recipe.tags.map((tag) => (
          <p
            className="type-name"
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))}
        { isCopied && <p>Link copied!</p> }
        <button
          type="button"
          className="share"
          onClick={ () => clickCopyButton() }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="icon-share"
          />
        </button>
      </div>
    </section>
  );
};

DoneFoods.propTypes = {
  recipe: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneFoods;
