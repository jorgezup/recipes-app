import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';

class Drinks extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <SearchHeader location={ location } />
    );
  }
}

Drinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Drinks;
