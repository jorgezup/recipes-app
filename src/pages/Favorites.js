import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Layout from '../components/Layout';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../css/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  // const history = useHistory();
  const [buttonShare, setButtonShare] = useState([]);
  const [buttonAll, setButtonAll] = useState(true);
  const getFavoritesLocal = () => JSON.parse(localStorage.getItem('favoriteRecipes'))
  || [];

  const allFavoritesRecipes = () => {
    setFavorites(getFavoritesLocal());
  };

  useEffect(() => {
    setFavorites(getFavoritesLocal());
  }, []);

  const shareButton = (id, type) => {
    if (type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    }
    clipboardCopy(`http://localhost:3000/drinks/${id}`);
    setButtonShare(id);
  };

  const favoritesFoods = () => {
    setButtonAll(false);
    const favoriteFood = getFavoritesLocal().filter((foodsFav) => (
      foodsFav.type === 'food'
    ));
    setFavorites(favoriteFood);
  };

  const favoritesDrinks = () => {
    setButtonAll(false);
    const favoriteDrink = getFavoritesLocal().filter((drinksFav) => (
      drinksFav.type === 'drink'
    ));
    setFavorites(favoriteDrink);
  };

  const favoriteButton = (id, type) => {
    // setFavoriteHeart(false);
    const deleteFav = getFavoritesLocal()
      .filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(deleteFav));
    if (buttonAll) setFavorites(getFavoritesLocal());
    if (type === 'food' && buttonAll === false) {
      return favoritesFoods();
    }
    if (type === 'drink' && buttonAll === false) return favoritesDrinks();
  };

  return (
    <Layout title="Favorite Recipes">
      <div className="container-filters">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          className="filter-favorites"
          onClick={ allFavoritesRecipes }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          className="filter-favorites"
          onClick={ favoritesFoods }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          className="filter-favorites"
          onClick={ favoritesDrinks }
        >
          Drinks
        </button>
      </div>
      <div className="cards">
        {
          favorites.map((favorite, index) => (
            <div className="container-favorites" key={ favorite.id }>
              <Link
                className="favorites-card"
                to={ `/${favorite.type}s/${favorite.id}` }
              >

                <img
                  data-testid={ `${index}-horizontal-image` }
                  className="img-favorites"
                  src={ favorite.image }
                  alt={ favorite.name }
                />
                <div className="type-name">
                  {
                    favorite.nationality !== '' ? (
                      <p
                        className="type-favorites"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${favorite.nationality} - ${favorite.category}`}
                      </p>)
                      : (
                        <p
                          className="type-favorites"
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          {favorite.alcoholicOrNot}
                        </p>)
                  }
                  <h1
                    className="name-favorites"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {favorite.name}
                  </h1>
                </div>
              </Link>
              <div className="share-favorites">
                <button
                  type="button"
                  onClick={ () => shareButton(favorite.id, favorite.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    className="icon"
                    alt="icon-share"
                  />
                </button>
                {
                  buttonShare.includes(favorite.id) && <span>Link copied!</span>
                }
                <button
                  type="button"
                  onClick={ () => favoriteButton(favorite.id, favorite.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeart }
                    className="icon"
                    alt="icon-favorite"
                  />
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </Layout>
  );
};

export default Favorites;
