import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';
import Layout from '../components/Layout';

class Foods extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Layout title="Foods">
        <SearchHeader location={ location } />
      </Layout>
    );
  }
}

Foods.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Foods;
