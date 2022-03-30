import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MainWrapper from './MainWrapper';

const Layout = ({ title, children }) => {
  const { location: { pathname } } = useHistory();
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '360px',
      } }
    >
      <Header title={ title } />
      <MainWrapper>
        { children }
      </MainWrapper>
      {
        ((pathname === '/done-recipes') || (pathname === '/favorite-recipes'))
          ? ''
          : <Footer />
      }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default Layout;
