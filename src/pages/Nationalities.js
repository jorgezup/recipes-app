import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import RecipeSearchFood from '../components/RecipeSearchFood';

const LIMIT_FOOD = 12;
let limitFood = LIMIT_FOOD;

const Nationalities = () => {
  const [nacionalities, setNacionalities] = useState([]);
  const [nacionalitiesSelect, setNacionalitiesSelect] = useState('All');
  const [nacionalitieRecipe, setNacionalitieRecipe] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getNacionalities = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals } = await response.json();
      setNacionalities(meals);
    };
    getNacionalities();
  }, []);

  useEffect(() => {
    const getAllRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      const filteredNacionalitiesRecipe = meals.slice(0, limitFood);
      setNacionalitieRecipe(filteredNacionalitiesRecipe);
    };
    getAllRecipes();
  }, []);

  const getNacionalitieSelect = async ({ target: { value } }) => {
    setNacionalitiesSelect(value);
    let url = '';
    if (value === 'All') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    }
    const response = await fetch(url);
    const { meals } = await response.json();
    if (meals.length < limitFood) {
      limitFood = meals.length;
    } else {
      limitFood = LIMIT_FOOD;
    }
    const filteredNacionalitiesRecipe = meals.slice(0, limitFood);
    setNacionalitieRecipe(filteredNacionalitiesRecipe);
  };

  return (
    <Layout title="Explore Nationalities">
      <select
        name="nacionalitiesSelect"
        id="nacionalitiesSelect"
        className="nacionalitiesSelect"
        data-testid="explore-by-nationality-dropdown"
        onChange={ getNacionalitieSelect }
        value={ nacionalitiesSelect }
      >
        <option data-testid="All-option" value="All">All</option>
        {
          nacionalities && nacionalities.map((nacionalitie, index) => (
            <option key={ index } data-testid={ `${nacionalitie.strArea}-option` }>
              {nacionalitie.strArea}
            </option>
          ))
        }
      </select>
      {
        nacionalitieRecipe && <RecipeSearchFood
          recipes={ nacionalitieRecipe }
          history={ history }
        />
      }
    </Layout>
  );
};

export default Nationalities;
