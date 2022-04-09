import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import App from '../App';

const EXPLORE_FOODS_BUTTON_TEST_ID = 'explore-foods';
const EXPLORE_DRINKS_BUTTON_TEST_ID = 'explore-drinks';
const SEARCH_BUTTON_TEST_ID = 'search-top-btn';
const EXPLORE_FOODS_INGREDIENTS_BTN_TEST_ID = 'explore-by-ingredient';
const EXPLORE_FOODS_NACIONALITY_BTN_TEST_ID = 'explore-by-nationality';
const EXPLORE_FOODS_SURPRISE_BTN_TEST_ID = 'explore-surprise';
const ROUTE_EXPLORE_FOODS = '/explore/foods';

describe('Verificar a tela de explore', () => {
  const { history } = renderWithRouterAndStore(<App />);
  history.push('/explore');
  const titleExplore = screen.getByRole('heading', {
    name: /Explore/i, level: 1,
  });
  expect(titleExplore).toBeInTheDocument();
  expect(screen.getByTestId(SEARCH_BUTTON_TEST_ID)).not.toBeInTheDocument();

  test('Tem os data-testids explore-foods e explore-drinks', () => {
    renderWithRouterAndStore(<App />);

    expect(screen.getByTestId(EXPLORE_FOODS_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(EXPLORE_DRINKS_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  test('Verificar se os nomes nos botões são "Explore Foods" e "Explore Drinks"', () => {
    renderWithRouterAndStore(<App />);
    const exploreFoodsBtn = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    const exploreDrinksBtn = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });
    expect(exploreFoodsBtn).toBeInTheDocument();
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  test(`Verificar se ao clicar no botão "Explore Foods" a pagina é 
  redirecionada para a pagina de explorar comidas`, () => {
    const btnFoods = screen.getByTestId(EXPLORE_FOODS_BUTTON_TEST_ID);
    userEvent.click(btnFoods);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  test(`Verificar se ao clicar no botão "Explore Drinks" a pagina é 
  redirecionada para a pagina de explorar drinks`, () => {
    const btnDrinks = screen.getByTestId(EXPLORE_DRINKS_BUTTON_TEST_ID);
    userEvent.click(btnDrinks);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});

describe('Verificar a tela de explorar comidas', () => {
  const { history } = renderWithRouterAndStore(<App />);
  history.push(ROUTE_EXPLORE_FOODS);
  const titleExplore = screen.getByRole('heading', {
    name: /Explore foods/i, level: 1,
  });
  expect(titleExplore).toBeInTheDocument();
  expect(screen.getByTestId(SEARCH_BUTTON_TEST_ID)).not.toBeInTheDocument();

  test('Tem os data-testids', () => {
    renderWithRouterAndStore(<App />);

    expect(screen.getByTestId(EXPLORE_FOODS_INGREDIENTS_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(EXPLORE_FOODS_NACIONALITY_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(EXPLORE_FOODS_SURPRISE_BTN_TEST_ID)).toBeInTheDocument();
  });

  test(`Verificar se os nomes nos botões são "By Ingredients", "By Nationality", 
  "Surprise Me!"`, () => {
    history.push(ROUTE_EXPLORE_FOODS);
    const byIngredientsBtn = screen.getByRole('button', {
      name: /By Ingredients/i,
    });
    const byNationalityBtn = screen.getByRole('button', {
      name: /By Nationality/i,
    });
    const surpriseMeBtn = screen.getByRole('button', {
      name: /Surprise Me!/i,
    });
    expect(byIngredientsBtn).toBeInTheDocument();
    expect(byNationalityBtn).toBeInTheDocument();
    expect(surpriseMeBtn).toBeInTheDocument();
  });

  test('Verificar se ao clicar no botao "By Ingredient" a pagina é redirecionada', () => {
    history.push(ROUTE_EXPLORE_FOODS);
    const btnIngredients = screen.getByTestId(EXPLORE_FOODS_INGREDIENTS_BTN_TEST_ID);
    userEvent.click(btnIngredients);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  test(`Verificar se ao clicar no botao "By Nacionality" a pagina é 
  redirecionada`, () => {
    history.push(ROUTE_EXPLORE_FOODS);
    const btnNacionality = screen.getByTestId(EXPLORE_FOODS_NACIONALITY_BTN_TEST_ID);
    userEvent.click(btnNacionality);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  test(`Verificar se ao clicar no botao "Surprise Me!" a pagina é 
  redirecionada`, () => {
    history.push(ROUTE_EXPLORE_FOODS);
    const btnSurprise = screen.getByTestId(EXPLORE_FOODS_SURPRISE_BTN_TEST_ID);
    userEvent.click(btnSurprise);
    expect(history.location.pathname).toBe(`/foods/${randomFood.idMeal}`);
  });
});
