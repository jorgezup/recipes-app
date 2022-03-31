import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const SUBMIT_BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'fulano@gmail.com';
const VALID_PASSWORD = '1234567';

describe('Verificar a tela de login', () => {
  test('Verificar os elementos para o login', () => {
    renderWithRouterAndStore(<App />);
    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SUBMIT_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  test('Verificar se é possível escrever o email e a senha dentro dos parametros', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    expect(email.value).toBe(VALID_EMAIL);
    expect(button.disabled).toBeTruthy();

    userEvent.type(password, VALID_PASSWORD);
    expect(password.value).toBe(VALID_PASSWORD);
    expect(button.disabled).toBeFalsy();
  });

  test('Verificar se as informações são salvas no localstorage', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);
    expect(JSON.parse(localStorage.getItem('user')).email).toBe(VALID_EMAIL);
  });

  test('Verificar se o usuário é redirecionado após realizar o login', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/foods');
  });
});
