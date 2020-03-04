/*
Filename: index.js
Contributors:
    Ryan Cave     - Initial file implementation.
    Parker Wagner - Created Auth constant and passed it into app state.
 */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Auth from "./Auth";
import {schoolColorPrimary, schoolColorSecondary} from "./constants";

export const auth = new Auth();

// global theme goes here

let state = {};
window.setState = (changes) => {
    state = Object.assign({}, state, changes);

    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App {...state}/>
        </MuiThemeProvider>, document.getElementById('root'));
};

const theme = createMuiTheme({

   palette: {
       primary: {
           main: schoolColorPrimary,
           dark: '#000000',
       },
       secondary: {
           main: schoolColorSecondary,
       },
       background: {
           default: '#fcfcfc',
       }
   }
});

/* eslint no-restricted-globals: 0*/
let username = auth.getProfile().given_name || "User";

let initialState = {
    name: username,
    location: location.pathname.replace(/^\/?|$/g, ""),
    auth
};

window.setState(initialState);

serviceWorker.unregister();
