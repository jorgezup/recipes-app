import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function RecipesContext({ children }) {
  contextValue = {};
  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

RecipesContext.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesContext;
