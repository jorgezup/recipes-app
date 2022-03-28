import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Foods extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <main>
        <Header />
        <SearchHeader location={ location } />
        <Footer />
      </main>
    );
  }
}

Foods.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Foods;
