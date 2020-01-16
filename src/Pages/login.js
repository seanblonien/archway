/*
Filename: login.js
Contributors:
Parker Wagner - Implemented this page as a test for basic login functionality.
 */

import React, {Component} from "react";

export default class Login extends Component {
    render() {
        return (
            <div>
                <p className="App-intro">
                    Hello, {this.props.name}<br/>
                    Do you want to see the secret area? <a href="/secret">Click here </a>
                </p>

                {!this.props.auth.isAuthenticated() &&
                <div>
                    <hr/>
                    Please login first
                    <hr/>
                    <button onClick={this.props.auth.login}>Login</button>
                </div>
                }

            </div>
        )
    }
}