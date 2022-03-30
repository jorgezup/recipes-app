import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import RecipeSearchFood from '../components/RecipeSearchFood';

const Foods = () => {
  const history = useHistory();
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { meals } = useSelector((state) => state.recipleSearch);
  // const filteredClick = useSelector((state) => state.filteredClicked);

  return (
    <Layout title="Foods">
      {searchClicked && <SearchHeader location={ location } />}
      {
        meals
        && (
          <RecipeSearchFood
            recipes={ meals }
            history={ history }
          />
        )
      }

    </Layout>
  );
};

export default Foods;
