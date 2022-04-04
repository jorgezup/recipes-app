import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducer from '../Redux/reducers';

export const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const renderWithRouterAndStore = (component, routeConfigs = {}, initialState) => {
  const route = routeConfigs.route || '/';
  const store = getStore(initialState);
  const history = routeConfigs.history
    || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndStore;
