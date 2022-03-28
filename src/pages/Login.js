import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { emailValidation } from '../Redux/actions';

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
        const minPassword = 6;
        if (characters.length >= minPassword) {
          this.setState({ enabledPassword: true });
        } else {
          this.setState({ enabledPassword: false });
        }
      }

      render() {
        const { email, enabledEmail, enabledPassword } = this.state;
        const { userLogin } = this.props;
        return (
          <div>
            <label htmlFor="input-email">
              Email:
              <input
                onChange={ this.enabledEmail }
                type="email"
                id="input-email"
                data-testid="email-input"
              />
            </label>
            <label htmlFor="input-password">
              Senha:
              <input
                onChange={ this.enabledPassword }
                type="password"
                id="input-password"
                data-testid="password-input"
              />
            </label>
            {/* <Link to="proxima pagina"> */}
            <button
              type="button"
              onClick={ () => userLogin(email) }
              to="/carteira"
              disabled={ !(enabledEmail && enabledPassword) }
            >
              Entrar
            </button>
            {/* </Link> */}
          </div>);
      }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(emailValidation(state)),
});

export default connect(null, mapDispatchToProps)(Login);
