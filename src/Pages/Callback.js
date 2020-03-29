import React, {Component} from 'react';
import StorageManager from '../Contexts/StorageManager';
import {AuthContext} from '../Contexts/AuthProvider';

/**
 * This class is a React component that handles the callback functionality
 * from the authorization workflow.
 */
export default class Callback extends Component {
  componentDidMount() {
    // StorageManager.clearLocalStorage();
    console.log("about to handle authentication...");
    this.context.handleAuthentication();
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
Callback.contextType = AuthContext;
