import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MainWrapper from './MainWrapper';
import '../css/Layout.css';

const Layout = ({ title, children }) => {
  const { location: { pathname } } = useHistory();
  return (
    <div
      className="layout-page"
    >
      <Header className="header" title={ title } />
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
