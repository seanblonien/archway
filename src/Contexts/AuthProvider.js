import PropTypes from 'prop-types';
import React, {Component} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import {
  Auth0InitOptions,
  Auth0LogoutReturnTo,
  Auth0RedirectCallback
} from '../constants';
import history from '../utils/history';

export const AuthContext = React.createContext({});

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
    const {onRedirectCallback, initOptions} = this.props;

    const auth0Client = await createAuth0Client(initOptions);
    this.setState({auth0Client});

    if (history.location.search.includes('code=') &&
      history.location.search.includes('state=')) {
      const {appState} = await auth0Client.handleRedirectCallback();
      onRedirectCallback(appState);
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    this.setState({isAuthenticated});

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      this.setState({user});
    }

    this.setState({loading: false});
  }

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
    const user = await auth0Client.getUser();
    this.setState({user, isAuthenticated: true});
  };

  handleRedirectCallback = async () => {
    const {auth0Client} = this.state;

    this.setState({loading: true});
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    this.setState({loading: false, isAuthenticated: true, user});
  };

  render() {
    const {children, returnTo} = this.props;
    const {isAuthenticated, user, loading, popupOpen, auth0Client} = this.state;
    const {loginWithPopup, handleRedirectCallback} = this;

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
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
  onRedirectCallback: PropTypes.func,
  children: PropTypes.node.isRequired,
  returnTo: PropTypes.string,
  initOptions: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    client_id: PropTypes.string.isRequired,
    redirect_uri: PropTypes.string.isRequired,
  })
};

AuthProvider.defaultProps = {
  onRedirectCallback: () => Auth0RedirectCallback(),
  returnTo: Auth0LogoutReturnTo,
  initOptions: Auth0InitOptions
};
