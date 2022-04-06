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
    <section key={ recipe.id }>
      <Link to={ `/foods/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          className="done-recipe-image"
        />
        <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.nationality }
        { ' - ' }
        { recipe.category }
      </h3>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
      <button
        type="button"
        onClick={ () => clickCopyButton() }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="icon-share"
        />
      </button>
      { isCopied && <p>Link copied!</p> }
      {recipe.tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
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
