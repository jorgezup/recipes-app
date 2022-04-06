import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Explore.css';

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
      <div className="explore-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-foods"
          onClick={ handleClickFoods }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-drinks"
          onClick={ handleClickDrinks }
        >
          Explore Drinks
        </button>
      </div>
    </Layout>
  );
};

export default Explore;
