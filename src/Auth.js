/*
Filename: Auth.js
Contributors:
Parker Wagner - Wrote entire page and authentication workflow.
 */

/* eslint no-restricted-globals: 0*/

import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: "cappy.auth0.com",
        clientID: "9bKo0ksvr1TrqcASqTgzmEXZyxZf42Dm",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://cappy.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile"
    });

    constructor() {
        this.login = this.login.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        if (!localStorage.getItem("nickname")) {
            this.auth0.parseHash(async (err, authResults) => {
                if (authResults && authResults.accessToken && authResults.idToken) {
                    let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                    localStorage.setItem("access_token", authResults.accessToken);
                    localStorage.setItem("id_token", authResults.idToken);
                    localStorage.setItem("expires_at", expiresAt);

                    let testVar = this.getProfile();

                    if (testVar !== {}) {
                        for (var key in testVar) {
                            if (testVar.hasOwnProperty(key) && (key === "sub" || key === "name" || key === "nickname"))
                                localStorage.setItem(key, testVar[key]);
                        }
                    }

                    // In either case, we should have a jwt token returned to us and we can
                    // reference it from localStorage.
                    location.hash = "";
                    location.pathname = LOGIN_SUCCESS_PAGE;

                } else if (err) {
                    location.pathname = LOGIN_FAILURE_PAGE;
                    console.log(err);
                }
            });
        }
        location.pathame = LOGIN_SUCCESS_PAGE;
    }

    hashCode(s) {
        let h;
        for(let i = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;

        return ""+h;
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout() {
        localStorage.clear();
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    getProfile() {
        if(localStorage.getItem("id_token")) {
            return jwtDecode(localStorage.getItem("id_token"));
        }else {
            return {}
        }
    }
}