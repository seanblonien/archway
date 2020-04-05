import React, {Component} from 'react';
import history from '../utils/history';
import StorageManager from './StorageManager';

export const AuthContext = React.createContext({});

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: undefined,
      jwt: undefined,
      loading: true,
    };
  }

  async componentDidMount() {
    // TODO set/load local storage user/jwt

  }

  // REDO THIS FUNCTION BECAUSE IT NEEDS TO BE AUTHENTICATED WITH STRAPI
  isAuthenticated = () => {
    // TODO use state
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    // TODO clear local storage user/jwt
  };

  login = (user) => {
    // TODO set local storage user/jwt
  };

  register = (user) => {

  };

  forgotPassword = (email) => {

  };

  render() {
    const {children} = this.props;
    const {isAuthenticated, user} = this.state;
    const {logout, login, register, forgotPassword} = this;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          logout,
          login,
          register,
          forgotPassword
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
