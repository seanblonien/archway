import React, {Component} from 'react';
import history from '../utils/history';
import {strapi, strapiURL} from '../constants';
import auth from '../Auth';

export default class Secret extends Component {
  async componentDidMount() {
    if(localStorage.getItem('sub') !== null) {
      let email = '';
      let username = '';
      let password = '';

      if (localStorage.getItem('sub').includes('google')) {
        email = `${localStorage.getItem('nickname')}@gmail.com`;
        username = localStorage.getItem('nickname');
        password = auth.hashCode(`${email + username}google`);
      } else {
        email = localStorage.getItem('name');
        username = localStorage.getItem('nickname');
        password = auth.hashCode(`${email + username}auth0`);
      }

      strapi.axios.post(`${strapiURL}/auth/local`, {
        identifier: email,
        password
      }).then(response => {
        localStorage.setItem('USER', JSON.stringify(response.data.user));
        localStorage.setItem('USERTOKEN', response.data.jwt);
        history.push('/');
      }).catch(() => {
        strapi.axios.post(`${strapiURL}/auth/local/register`, {
          username,
          email,
          password
        }).then(response => {
          localStorage.setItem('USER', JSON.stringify(response.data.user));
          localStorage.setItem('USERTOKEN', response.data.jwt);
          history.push('/');
        });
      });
    }
  }

  render() {
    return auth.isAuthenticated() ?
      <div>
        This is a secret area.
        <br/>
        <button onClick={auth.logout} type='button'>Logout</button>
      </div>
      :
      <div/>;
  }
}
