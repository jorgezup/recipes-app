import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';

class Drinks extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Layout title="Drinks">
        <SearchHeader location={ location } />
      </Layout>
    );
  }
}

Drinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Drinks;
