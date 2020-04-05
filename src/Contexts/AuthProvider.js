import React, {Component} from 'react';
import api from '../Services/api';
import StorageManager from './StorageManager';

export const AuthContext = React.createContext({});

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: undefined,
      token: undefined,
    };
  }

  async componentDidMount() {
    // TODO set/load local storage user/jwt
    const user = StorageManager.getItem('user');
    const token = StorageManager.getItem('token');
    if(user && token){
      let response = null;
      while(response == null){
        try{
          response = await api.authenticate();
          console.log('Successfully logged in.');
          this.setUserInStorage(user, token);
        } catch(error) {
          //handle error
          console.log(error);
          this.clearCookies();
        }
      }
    } else {
      this.clearCookies();
    }
  }

  clearCookies = () => {
    this.setState({
      isAuthenticated: false,
      user: undefined,
      token: undefined,
    });
    StorageManager.clearLocalStorage();
    console.log('Successfully cleared local storage.');
  };

  logout = () => {
    // TODO clear local storage user/jwt
    console.log('Logging out...');
    this.clearCookies();
  };

  setUserInStorage = (user, token) => {
    console.log('User profile', user);
    StorageManager.setItem('user', user);
    console.log('User token', token);
    StorageManager.setItem('token', token);
    this.setState({
      isAuthenticated: true,
      user: user,
      token: token,
    });
  } ;

  login = async (identifier, password) => {
    // TODO set local storage user/jwt
    let response = null;
    while(response == null) {
      try {
        response = await api.login(identifier, password);
        console.log('Successfully logged in.');
        this.setUserInStorage(response.data.user, response.data.jwt)
      } catch(error) {
        //handle error
        console.log(error);
      }
    }
  };

  register = async (user) => {
    let response = null;
    while(response == null){
      try {
        response = await api.register(user);
        console.log('Successfully registered. Will redirect to log you in.');
        this.setUserInStorage(response.data.user, response.data.jwt)
      } catch(error) {
        //handle error
        console.log(error);
      }
    }
  };

  forgotPassword = async (email) => {
    let response = null;
    while(response == null){
      try {
        response = await api.forgotPassword(email);
        console.log(response);
      } catch (error) {
        //handle error
        console.log(error);
      }
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
