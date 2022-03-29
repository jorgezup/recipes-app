import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';

const Drinks = () => {
  const { location } = useHistory();
  return (
    <Layout title="Drinks">
      <SearchHeader location={ location } />
    </Layout>
  );
};

export default Drinks;
