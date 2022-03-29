import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';
import RecipeSearch from '../components/RecipeSearch';

const Foods = () => {
  const history = useHistory();
  const { location } = history;
  const searchClicked = useSelector((state) => state.searchClicked);
  const { meals } = useSelector((state) => state.foodSearch);
  const filteredClicked = useSelector((state) => state.filteredClicked);
  return (
    <Layout title="Foods">
      {searchClicked && <SearchHeader location={ location } />}
      {
        filteredClicked
        && (
          <RecipeSearch
            recipes={ meals }
            history={ history }
          />
        )
      }

    </Layout>
  );
};

export default Foods;
