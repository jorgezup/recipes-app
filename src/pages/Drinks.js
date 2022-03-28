import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Drinks extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <section>
        <Header />
        <SearchHeader location={ location } />
        <Footer />
      </section>
    );
  }
}

Drinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Drinks;
