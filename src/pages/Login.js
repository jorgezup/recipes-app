import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailValidation } from '../Redux/actions';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      enabledEmail: false,
      enabledPassword: false,
    };
  }

    enabledEmail = ({ target }) => {
      const formatEmail = target.value;
      this.setState({ email: formatEmail });
      if (formatEmail.includes('@') && formatEmail.includes('.com')) {
        this.setState({ enabledEmail: true });
      } else {
        this.setState({ enabledEmail: false });
      }
    }

      enabledPassword = ({ target }) => {
        const characters = target.value;
        const minPassword = 7;
        if (characters.length >= minPassword) {
          this.setState({ enabledPassword: true });
        } else {
          this.setState({ enabledPassword: false });
        }
      }

      handleClick = () => {
        const { email } = this.state;
        const { userLogin, history } = this.props;
        const emailUser = email;
        userLogin(email);
        localStorage.setItem('user', JSON.stringify({ email: emailUser }));
        localStorage.setItem('mealsToken', 1);
        localStorage.setItem('cocktailsToken', 1);
        history.push('/foods');
      }

      render() {
        const { email, enabledEmail, enabledPassword } = this.state;
        return (
          <div className="login-container">
            <label htmlFor="input-email">
              Email:
              <input
                onChange={ this.enabledEmail }
                type="email"
                className="email"
                id="input-email"
                data-testid="email-input"
              />
            </label>
            <label htmlFor="input-password">
              Senha:
              <input
                onChange={ this.enabledPassword }
                type="password"
                className="password"
                id="input-password"
                data-testid="password-input"
              />
            </label>
            <button
              type="button"
              onClick={ () => this.handleClick(email) }
              to="/foods"
              className="submit"
              disabled={ !(enabledEmail && enabledPassword) }
              data-testid="login-submit-btn"
            >
              Entrar
            </button>
          </div>);
      }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(emailValidation(state)),
});

export default connect(null, mapDispatchToProps)(Login);
