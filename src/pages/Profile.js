import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import '../css/Profile.css';

function Profile() {
  const history = useHistory();

  const userEmail = JSON.parse(localStorage.getItem('user'));

  const logoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Layout title="Profile">
      <h3
        className="user"
        data-testid="profile-email"
      >
        { userEmail && userEmail.email }

      </h3>
      <div className="btn-profile-container">
        <button
          type="button"
          className="btn-profile"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="btn-profile"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="btn-profile"
          data-testid="profile-logout-btn"
          onClick={ () => logoutClick() }
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}

export default Profile;
