import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import homeIcon from '../images/icons8-home.svg';
import SearchHeader from './SearchHeader';
import Title from './Title';
import '../css/Header.css';

const Header = ({ title }) => {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const [showSearchIcon, setShowSearchIcon] = useState(undefined);
  const [isSearchHeaderOpen, setSearchHeaderOpen] = useState(false);

  const toggleSearchHeader = () => {
    setSearchHeaderOpen(!isSearchHeaderOpen);
  };

  const getLocation = () => {
    if (
      pathname === '/foods'
        || pathname === '/drinks'
        || pathname === '/explore/foods/nationalities'
    ) {
      return true;
    }
    return false;
  };

  if (showSearchIcon === undefined) {
    setShowSearchIcon(getLocation());
  }

  return (
    <div className="header">
      <header>
        <button
          className="profile"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="profile-svg"
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        <Title>{title}</Title>
        {showSearchIcon && (
          <button className="search" type="button" onClick={ toggleSearchHeader }>
            <img
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
        {
          !showSearchIcon && (
            <Link to="/foods">
              <img
                src={ homeIcon }
                alt="home"
                style={ { width: '42px', height: '42px', fontWeight: '700' } }
              />
            </Link>
          )
        }
      </header>
      <div className="margin" />
      {
        isSearchHeaderOpen && <SearchHeader />
      }
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
