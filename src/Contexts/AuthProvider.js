import PropTypes from 'prop-types';
import React, {Component} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import {
  Auth0InitOptions,
  Auth0LogoutReturnTo,
} from '../constants';
import history from '../utils/history';
import StorageManager from './StorageManager';

export const AuthContext = React.createContext({});
const LOGIN_SUCCESS_PAGE = '/secret';
const LOGIN_FAILURE_PAGE = '/';
export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: undefined,
      auth0Client: undefined,
      loading: true,
      popupOpen: false
    };
  }

  async componentDidMount() {
    const {initOptions} = this.props;

    const auth0Client = await createAuth0Client(initOptions);
    this.setState({auth0Client});

    if (history.location.search.includes('code=') &&
      history.location.search.includes('state=')) {
      this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    this.setState({isAuthenticated});

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      this.setState({user});
    }

    this.setState({loading: false});
  }

  handleAuthentication = () => {
    console.log("handling authentication...");
    const {auth0Client} = this.state;
    if (!StorageManager.getItem('nickname')) {
      const accessToken = auth0Client.getTokenSilently();
      console.log(accessToken);
      accessToken.then(accessToken => {console.log(accessToken)});
      const idToken = auth0Client.getIdTokenClaims();
      console.log(idToken);
      idToken.then(idToken => {console.log(idToken)});

      // if (accessToken && idToken) {
      //   const expiresAt = JSON.stringify((expiresIn) * 1000 + new Date().getTime());
      // StorageManager.setItem('access_token', accessToken);
      // StorageManager.setItem('id_token', idToken);
      //   StorageManager.setItem('expires_at', expiresAt);
      //
      //   const testVar = StorageManager.getProfile();
      //
      //   if (testVar !== {}) {
      //     Object.keys(testVar).forEach(key => {
      //       if (testVar[key] && (key === 'sub' || key === 'name' || key === 'nickname'))
      //         StorageManager.setItem(key, testVar[key]);
      //     });
      //   }
      //
      //   // In either case, we should have a jwt token returned to us and we can
      //   // reference it from localStorage.
      //   history.location.hash = '';
      //   history.location.pathname = LOGIN_SUCCESS_PAGE;
      // } else {
      //   history.location.pathname = LOGIN_FAILURE_PAGE;
      // }
      history.push("/");
    }
  };

  loginWithPopup = async (params = {}) => {
    const {auth0Client} = this.state;
    this.setState({popupOpen: true});
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({popupOpen: false});
    }
    this.handleRedirectCallback();
    const user = await auth0Client.getUser();
    console.log(user);
    this.setState({user, isAuthenticated: true});
  };

  handleRedirectCallback = async () => {
    const {auth0Client} = this.state;
    this.setState({loading: true});
    // await auth0Client.handleRedirectCallback();
    history.push("/callback");
    const user = await auth0Client.getUser();
    console.log(user);
    this.setState({loading: false, isAuthenticated: true, user});
  };

  render() {
    const {children, returnTo} = this.props;
    const {isAuthenticated, user, loading, popupOpen, auth0Client} = this.state;
    const {loginWithPopup, handleRedirectCallback, handleAuthentication} = this;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
          handleAuthentication,
          getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
          loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
          getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
          getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
          logout: (...p) => auth0Client.logout({returnTo, ...p})
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  returnTo: PropTypes.string,
  initOptions: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    client_id: PropTypes.string.isRequired,
    redirect_uri: PropTypes.string.isRequired,
  })
};

AuthProvider.defaultProps = {
  returnTo: Auth0LogoutReturnTo,
  initOptions: Auth0InitOptions
};
