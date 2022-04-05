import PropTypes from 'prop-types';
import React from 'react';
import '../css/Card.css';

const Card = ({ title, image, index }) => (
  <div className="card-foods" data-testid={ `${index}-recipe-card` }>
    <img
      data-testid={ `${index}-card-img` }
      src={ image }
      alt=""
    />
    <h3 data-testid={ `${index}-card-name` } className="name-food">{title}</h3>
  </div>
);

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Card;
