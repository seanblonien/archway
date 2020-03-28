import React, {Component} from 'react';
import {AuthContext} from '../Contexts/AuthProvider';
import auth from '../Auth';

/**
 * This class is a React component that handles the callback functionality
 * from the authorization workflow.
 */
export default class Callback extends Component {
  componentDidMount() {
    localStorage.clear();
    console.log("about to handle authentication...");
    const {handleAuthentication} = this.context;
    handleAuthentication();
    // auth.handleAuthentication();

  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}
