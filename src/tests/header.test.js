import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import App from '../App';

const PROFILE_TOP_TEST_ID = 'profile-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';
const SEARCH_TOP_TEST_ID = 'search-top-btn';

describe('Verificar o header', () => {
  test('Verificar os elementos para o header', () => {
    renderWithRouterAndStore(<App />);
    expect(screen.getByTestId(PROFILE_TOP_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_TOP_TEST_ID)).toBeInTheDocument();
  });

  test('Verificar se o usuário é redirecionado para a tela de perfil', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const button = screen.getByTestId(SEARCH_TOP_TEST_ID);

    userEvent.click(button);
    expect(history.location.pathname).toBe('/profile');
  });
});
