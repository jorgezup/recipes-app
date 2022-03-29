import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import RecipeSearchDrink from '../components/RecipeSearchDrink';

const Drinks = () => {
  const history = useHistory();
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { drinks } = useSelector((state) => state.recipleSearch);

  return (
    <Layout title="Drinks">
      {searchClicked && <SearchHeader location={ location } />}
      {
        drinks
        && (
          <RecipeSearchDrink
            recipes={ drinks }
            history={ history }
          />
        )
      }

    </Layout>
  );
};

export default Drinks;
