import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { buttonSearchClicked, drinkSearchAPI, foodSearchAPI } from '../Redux/actions';

const SearchHeader = () => {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [radio, setRadio] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const { location } = useHistory();

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearchRecipe(value);
  };

  const handleChanges = ({ target }) => {
    const { id } = target;
    setRadio(id);
  };

  const handleClick = () => {
    if (searchRecipe.length && radio.length) {
      if (searchRecipe.length > 1 && radio === 'firstLetter') {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      setIsClicked(true);
      dispatch(buttonSearchClicked({
        searchRecipe,
        radio,
        isClicked,
      }));

      if (location.pathname === '/drinks') {
        dispatch(drinkSearchAPI(searchRecipe, radio, location.pathname));
      } else {
        dispatch(foodSearchAPI(searchRecipe, radio, location.pathname));
      }
    } else {
      console.log('asqwe');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <section>
      <input
        type="text"
        name="searchRecipe"
        data-testid="search-input"
        value={ searchRecipe }
        onChange={ handleSearch }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value={ radio }
          onChange={ handleChanges }
        />
        Ingredient
      </label>
      <label htmlFor="nameSearch">
        <input
          type="radio"
          name="radio"
          id="nameSearch"
          value={ radio }
          data-testid="name-search-radio"
          onChange={ handleChanges }
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          type="radio"
          name="radio"
          id="firstLetter"
          value={ radio }
          data-testid="first-letter-search-radio"
          onChange={ handleChanges }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </section>
  );
};

export default SearchHeader;
