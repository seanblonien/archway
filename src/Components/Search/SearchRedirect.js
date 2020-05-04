import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class SearchRedirect extends Component {
  constructor(props) {
    super(props);
    const {match} = props;

    this.state = {
      redir: match.params,
    };
  }

  render() {
    const {redir} = this.state;

    if (redir.searchTerm !== undefined) {
      const newPath = `/${redir.path}/${redir.searchTerm}`;

      return <Redirect to={newPath}/>;
    }

    return <Redirect to={`/${redir.path}`}/>;
  }
}
