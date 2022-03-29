import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ children }) => (
  <h1 data-testid="page-title">{children}</h1>
);

Title.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Title;
