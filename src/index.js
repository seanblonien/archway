import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeManager from './Components/ThemeManager';
import App from './App';
import './index.css';
import * as serviceWorker from './Services/serviceWorker';

ReactDOM.render(
  <ThemeManager>
    <CssBaseline/>
    <App/>
  </ThemeManager>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
