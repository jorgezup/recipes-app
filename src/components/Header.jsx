import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { buttonSearchClicked } from '../Redux/actions';
import Title from './Title';

const Header = ({ title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    location: { pathname },
  } = history;
  /* Provavel ter um contexto para o Header para controle do
  botão no header e no componente de busca do header */
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);

  const handleSearchBtn = () => {
    setIsBtnClicked(!isBtnClicked);
  };

  useEffect(() => {
    dispatch(buttonSearchClicked(isBtnClicked));
  }, [isBtnClicked, dispatch]);

  useEffect(() => {
    const getLocation = () => {
      if (
        pathname === '/foods'
        || pathname === '/drinks'
        || pathname === '/explore/foods/nationalities'
      ) {
        setShowSearchIcon(true);
      } else {
        setShowSearchIcon(false);
      }
    };
    getLocation();
  }, [pathname]);
  return (
    <header
      style={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '70px',
      } }
    >
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>
      <Title>{title}</Title>
      {showSearchIcon && (
        <button type="button" onClick={ handleSearchBtn }>
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
