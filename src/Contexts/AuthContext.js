import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import StorageManager from './StorageManager';
import history from '../utils/history';

const AuthContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const user = StorageManager.getItem('user');
    const token = StorageManager.getItem('token');
    if(user && token) {
      this.setState({
        isAuthenticated: true,
        user,
        token,
      });
    }
  }

  logout = () => {
    this.setState(initialState);
    StorageManager.clearLocalStorage();
  };

  setUserInStorage = (user, token) => {
    StorageManager.setItem('user', user);
    StorageManager.setItem('token', token);
  };

  handleAuthenticationResponse = (response, useStorage, redirect) => {
    const {user, jwt: token} = response.data;
    if(useStorage) {
      this.setUserInStorage(user, token);
    }
    this.setState({
      isAuthenticated: true,
      user,
      token,
    });
    history.push(redirect);
  };

  login = async (identifier, password, useStorage = true) => {
    try {
      const response = await api.login(identifier, password);
      this.handleAuthenticationResponse(response, useStorage, '/');
    } catch(error) {
      // TODO
    }
  };

  register = async (user, useStorage = true) => {
    try {
      const response = await api.register(user);
      this.handleAuthenticationResponse(response, useStorage, '/');
    } catch(error) {
      // TODO
    }
  };

  forgotPassword = async (email) => {
    try {
      await api.forgotPassword(email);
    } catch (error) {
      // TODO
    }
  };

  render() {
    const {children} = this.props;
    const {isAuthenticated, user, token} = this.state;
    const {logout, login, register, forgotPassword} = this;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          token,
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
