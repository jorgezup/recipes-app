import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ title, image, index }) => (
  <div data-testid={ `${index}-recipe-card` }>
    <h3 data-testid={ `${index}-card-name` }>{title}</h3>
    <img
      data-testid={ `${index}-card-img` }
      src={ image }
      alt=""
      style={ { width: '100%' } }
    />
  </div>
);

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Card;
