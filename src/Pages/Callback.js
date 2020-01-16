/*
Filename: Callback.js
Contributors:   Parker Wagner - Wrote whole file.
 */

import React, {Component} from 'react';
import Auth from "../Auth";

/**
 * This class is a React component that handles the callback functionality
 * from the authorization workflow.
 */
export default class Callback extends Component {

    componentDidMount() {
        localStorage.clear();
        const auth = new Auth();
        auth.handleAuthentication();
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        )
    }
}