import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import App from '../App';

const SEARCH_INPUT_TEST_ID = 'search-input';
const EXEC_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';
const INGREDIENT_SEARCH_BUTTON_TEST_ID = 'ingredient-search-radio';
const NAME_SEARCH_BUTTON_TEST_ID = 'name-search-radio';
const FIRST_LETTER_BUTTON_TEST_ID = 'first-letter-search-radio';

describe('Verificar a barra de procura', () => {
  test('Verifica se os button estão no componente', () => {
    renderWithRouterAndStore(<App />);
    expect(screen.getByTestId(INGREDIENT_SEARCH_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_SEARCH_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  test('Verifica se os button estão funcionando', () => {
    renderWithRouterAndStore(<App />);
    const inputButton = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredientButton = screen.getByTestId(INGREDIENT_SEARCH_BUTTON_TEST_ID);
    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TEST_ID);

    userEvent.type(inputButton, '');
    userEvent.click(ingredientButton);
    userEvent.click(execButton);
  });
});
