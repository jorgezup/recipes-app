import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const Explore = () => {
  const history = useHistory();
  const handleClickFoods = () => {
    history.push('/explore/foods');
  };
  const handleClickDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <Layout title="Explore">
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ handleClickFoods }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ handleClickDrinks }
      >
        Explore Drinks
      </button>
    </Layout>
  );
};

export default Explore;
