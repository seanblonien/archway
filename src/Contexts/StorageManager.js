import {Component} from 'react';
import jwtDecode from 'jwt-decode';

export default class StorageManager extends Component {
  constructor(props){
    super(props);
  };

  getItem = (key) => {
    return localStorage.getItem(key);
  };

  setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  getProfile = () => {
    if(localStorage.getItem('id_token')) {
      return jwtDecode(localStorage.getItem('id_token'));
    }
    return {};
  };
}