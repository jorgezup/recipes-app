import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const MAX_INGREDIENTS = 12;

const IngredientsDrinks = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientes = async () => {
      const endpointAPIIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const { drinks } = await fetch(endpointAPIIngredients)
        .then((response) => response.json());
      const filtered = drinks.reduce((acc, curl, index) => {
        if (index < MAX_INGREDIENTS) acc.push(curl);
        return acc;
      }, []);
      setIngredients(filtered);
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
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt="ingredient"
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
          </div>
        ))
      }
    </Layout>
  );
};

export default IngredientsDrinks;
