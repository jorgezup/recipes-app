import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const MAX_INGREDIENTS = 12;

const Ingredients = () => {
  const history = useHistory();
  const { location } = history;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientes = async () => {
      let endpointAPIIngredients = '';
      if (location.pathname === '/explore/foods/ingredients') {
        endpointAPIIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        const { meals } = await fetch(endpointAPIIngredients)
          .then((response) => response.json());
        const filtered = meals.reduce((acc, curl, index) => {
          if (index < MAX_INGREDIENTS) acc.push(curl);
          return acc;
        }, []);
        setIngredients(filtered);
      } else if (location.pathname === '/explore/drinks/ingredients') {
        endpointAPIIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const { drinks } = await fetch(endpointAPIIngredients)
          .then((response) => response.json());
        const filtered = drinks.reduce((acc, curl, index) => {
          if (index < MAX_INGREDIENTS) acc.push(curl);
          return acc;
        }, []);
        setIngredients(filtered);
      }
    };
    ingredientes();
  }, []);

  return (

    <Layout title="Explore Ingredients">
      {
        ingredients && ingredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt="ingredient"
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
          </div>
        ))
      }
    </Layout>
  );
};

export default Ingredients;
