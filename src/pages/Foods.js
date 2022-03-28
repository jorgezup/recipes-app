import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';

class Foods extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <SearchHeader location={ location } />
    );
  }
}

Foods.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Foods;
