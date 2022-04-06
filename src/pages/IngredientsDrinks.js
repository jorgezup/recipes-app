import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { drinkByIngredients } from '../Redux/actions';

const MAX_INGREDIENTS = 12;

const IngredientsDrinks = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const handleClickCard = (searchIngredient) => {
    dispatch(drinkByIngredients(searchIngredient));
    history.push('/drinks');
  };

  return (

    <Layout title="Explore Ingredients">
      <div className="container-ingredients-foods">
        {
          ingredients && ingredients.map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              className="card-foods-ingredients"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClickCard(ingredient.strIngredient1) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt="ingredient"
              />
              <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
            </button>
          ))
        }
      </div>
    </Layout>
  );
};

export default IngredientsDrinks;
