import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const history = useHistory();
  const { location: { pathname } } = history;
  /* Provavel ter um contexto para o Header para controle do
  botão no header e no componente de busca do header */
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const handleSearchBtn = () => {
    setIsBtnClicked(!isBtnClicked);
  };
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      <h1
        data-testid="page-title"
      >
        {pathname === '/foods' ? 'Foods' : 'Drinks'}

      </h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleSearchBtn }
      >
        <img src={ searchIcon } alt="Search Icon" />
      </button>
    </header>
  );
};

export default Header;
