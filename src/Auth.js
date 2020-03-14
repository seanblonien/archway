/* eslint no-restricted-globals: 0 */
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = '/secret';
const LOGIN_FAILURE_PAGE = '/';
const DOMAIN_PREFIX = 'archwaycapstone';

class Auth {
    auth0 = new auth0.WebAuth({
      domain: `${DOMAIN_PREFIX}.auth0.com`,
      clientID: 'V9OTevHpl8fIrm4ZV8sXbzH1c7CkRtxA',
      redirectUri: 'http://localhost:3000/callback',
      audience: `https://${DOMAIN_PREFIX}.auth0.com/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    login = () => {
      this.auth0.authorize();
    }

    handleAuthentication = () => {
      if (!localStorage.getItem('nickname')) {
        this.auth0.parseHash(async (err, authResults) => {
          if (authResults && authResults.accessToken && authResults.idToken) {
            const expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
            localStorage.setItem('access_token', authResults.accessToken);
            localStorage.setItem('id_token', authResults.idToken);
            localStorage.setItem('expires_at', expiresAt);

            const testVar = this.getProfile();

            if (testVar !== {}) {
              Object.keys(testVar).forEach(key => {
                if (testVar[key] && (key === 'sub' || key === 'name' || key === 'nickname'))
                  localStorage.setItem(key, testVar[key]);
              });
            }

            // In either case, we should have a jwt token returned to us and we can
            // reference it from localStorage.
            location.hash = '';
            location.pathname = LOGIN_SUCCESS_PAGE;
          } else if (err) {
            location.pathname = LOGIN_FAILURE_PAGE;
          }
        });
      }
    }

    hashCode = (s) => {
      return `${s.hashCode()}`;
    }

    isAuthenticated = () => {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    logout = () => {
      localStorage.clear();
      location.pathname = LOGIN_FAILURE_PAGE;
      // necessary link to clear cookies, else it logs user back in immediately
      window.location.replace(`http://${DOMAIN_PREFIX}.auth0.com/v2/logout`);
      window.location.replace('/');
    }

    getProfile = () => {
      if(localStorage.getItem('id_token')) {
        return jwtDecode(localStorage.getItem('id_token'));
      }
      return {};
    }

    getUser = () => {
      return JSON.parse(localStorage.getItem('USER'));
    };

    getNickname = () => {
      return localStorage.getItem('nickname');
    };

    getToken = () => {
      return localStorage.getItem('USERTOKEN');
    }
}

const auth = new Auth();
export default auth;
