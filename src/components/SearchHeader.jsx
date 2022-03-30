import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drinkSearchAPI, foodSearchAPI } from '../Redux/actions';

class SearchHeader extends React.Component {
  state = {
    searchRecipe: '',
    radio: '',
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      searchRecipe: value,
    });
  }

  handleChanges = ({ target }) => {
    const { id } = target;
    this.setState({
      radio: id,
    });
  };

  handleClick = () => {
    const { dispatch, location } = this.props;
    const { radio, searchRecipe } = this.state;
    if (searchRecipe.length > 1 && radio === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    }
    const exactLocation = location.pathname;
    dispatch(foodSearchAPI(searchRecipe, radio, exactLocation));
    dispatch(drinkSearchAPI(searchRecipe, radio, exactLocation));
  };

  render() {
    const { radio, searchRecipe } = this.state;
    return (
      <section>
        <input
          type="text"
          name="searchRecipe"
          data-testid="search-input"
          value={ searchRecipe }
          onChange={ this.handleSearch }
        />
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value={ radio }
            onChange={ this.handleChanges }
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
            onChange={ this.handleChanges }
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
            onChange={ this.handleChanges }
          />
          First Letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Search
        </button>
      </section>
    );
  }
}

SearchHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect()(SearchHeader);
