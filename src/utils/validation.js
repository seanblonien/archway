import Filter from 'bad-words';
import api from '../Services/api';

export const validatePassword = (password) => (password !== undefined && (password.length >= 6));

export const validateUsername = async (username) => {
  try {
    const response = await api.users.find({username});
    return response.length === 0;
  } catch (error) {
    return true;
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const passwordMatch = (password, secondPassword) => password === secondPassword;

export const isProfane = value => {
  const filter = new Filter();
  return !filter.isProfane(value);
};
