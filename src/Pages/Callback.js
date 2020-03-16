import React, {Component} from 'react';
import auth from '../Auth';

/**
 * This class is a React component that handles the callback functionality
 * from the authorization workflow.
 */
export default class Callback extends Component {
  componentDidMount() {
    localStorage.clear();
    auth.handleAuthentication();
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}
