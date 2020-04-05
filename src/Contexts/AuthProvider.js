import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import StorageManager from './StorageManager';
import history from '../utils/history';

export const AuthContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  user: undefined,
  token: undefined,
};

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const user = StorageManager.getItem('user');
    const token = StorageManager.getItem('token');
    this.setState({user, token});
  }

  logout = () => {
    this.setState(initialState);
    StorageManager.clearLocalStorage();
  };

  setUserInStorage = (user, token) => {
    StorageManager.setItem('user', user);
    StorageManager.setItem('token', token);
    this.setState({
      isAuthenticated: true,
      user,
      token,
    });
  } ;

  login = async (identifier, password) => {
    try {
      const response = await api.login(identifier, password);
      this.setUserInStorage(response.data.user, response.data.jwt);
      history.push('/');
    } catch(error) {
      console.log(error);
    }
  };

  register = async (user) => {
    try {
      const response = await api.register(user);
      this.setUserInStorage(response.data.user, response.data.jwt);
    } catch(error) {
      console.log(error);
    }
  };

  forgotPassword = async (email) => {
    try {
      const response = await api.forgotPassword(email);
      console.log(response);
    } catch (error) {
      console.log(error);
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
