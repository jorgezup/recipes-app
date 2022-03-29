import PropTypes from 'prop-types';
import React from 'react';

const MainWrapper = ({ children }) => (
  <main
    style={ {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 auto',
    } }
  >
    { children}
  </main>
);

MainWrapper.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MainWrapper;
