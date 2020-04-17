import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import {snack} from '../utils/Snackbar';
import StorageManager from './StorageManager';
import history from '../utils/Routing/history';
import AuthContext from './AuthContext';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

class AuthProvider extends Component {
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
    const {enqueueSnackbar} = this.props;
    this.setState(initialState);
    StorageManager.clearLocalStorage();
    enqueueSnackbar('Logged out', snack.default);
    history.push(routes.home.path);
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
    const {enqueueSnackbar} = this.props;

    try {
      const response = await api.login(identifier, password);
      this.handleAuthenticationResponse(response, useStorage, routes.home.path);
      enqueueSnackbar('Login successful', snack.success);
    } catch(error) {
      enqueueSnackbar('Error logging in', snack.error);
    }
  };

  register = async (user, useStorage = true) => {
    const {enqueueSnackbar} = this.props;
    try {
      const response = await api.register(user);
      this.handleAuthenticationResponse(response, useStorage, routes.home.path);
      enqueueSnackbar('Register successful', snack.success);
      return true;
    } catch(error) {
      enqueueSnackbar('Error registering', snack.error);
      return false;
    }
  };

  forgotPassword = async (email) => {
    const {enqueueSnackbar} = this.props;
    try {
      await api.forgotPassword(email);
      enqueueSnackbar('Reset password email sent', snack.info);
    } catch (error) {
      enqueueSnackbar('Error sending reset password email', snack.error);
    }
  };

  resetPassword = async (code, password, passwordConfirm) => {
    const {enqueueSnackbar} = this.props;
    try {
      await api.resetPassword(code, password, passwordConfirm);
      enqueueSnackbar('The password has been reset', snack.info);
    } catch (error) {
      enqueueSnackbar('Error resetting password', snack.error);
    }
  };

  render() {
    const {children} = this.props;
    const {isAuthenticated, user, token} = this.state;
    const {logout, login, register, forgotPassword, resetPassword} = this;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          token,
          logout,
          login,
          register,
          forgotPassword,
          resetPassword
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(AuthProvider);
