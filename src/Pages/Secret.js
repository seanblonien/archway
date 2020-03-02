/*
Filename: Secret.js
Description:    This page consumes the information returned by the authentication service.  It differentiates
                between users who have signed in using a Google account and by E-mail.
Contributors:   Parker Wagner - Wrote entire page.
 */

import React, {Component} from "react";
import {strapiURL, strapi} from "../constants";

export default class Secret extends Component {

    async componentDidMount() {
        if(localStorage.getItem("sub") !== null) {
            let email = '';
            let username = '';
            let password = '';

            if (localStorage.getItem("sub").includes("google")) {
                email = localStorage.getItem("nickname") + '@gmail.com';
                username = localStorage.getItem("nickname");
                password = this.props.auth.hashCode(email + username + "google");
            } else {
                email = localStorage.getItem("name");
                username = localStorage.getItem("nickname");
                password = this.props.auth.hashCode(email + username + "auth0");
            }

            strapi.axios.post(strapiURL + '/auth/local', {
                identifier: email,
                password: password
            }).then(response => {
                localStorage.setItem("USER", JSON.stringify(response.data.user));
                localStorage.setItem("USERTOKEN", response.data.jwt);
                this.props.history.push("/");
            }).catch(error => {
                strapi.axios.post(strapiURL + '/auth/local/register', {
                    username: username,
                    email: email,
                    password: password
                }).then(response => {
                    localStorage.setItem("USER", JSON.stringify(response.data.user));
                    localStorage.setItem("USERTOKEN", response.data.jwt);
                    this.props.history.push("/");
                }).catch(error => {
                    console.log("It should be impossible to get here, so if this is printed, buy the devs some coffee.");
                });
            });
        }
    }

    render() {
        if(this.props.auth.isAuthenticated()) {
            return (
                <div>
                    This is a secret area.
                    <br/>
                    <button onClick={this.props.auth.logout}>Logout</button>
                </div>
            )
        }
    }
}
