import _ from 'lodash';
import {userImport} from '../constants';
import api from '../Services/api';

/**
 * Validates the given user object to check for required fields
 * @param user the user object to validate
 * @returns {[boolean, []]} array of isValid boolean, and list string errors
 * (if any)
 */
export const validateAddUser = (user) => {
  const requiredFields = userImport.fields.filter(field => field.required);
  const emptyRequiredFields = requiredFields.filter(field => _.isEmpty(user[field.name]));
  const isValid = _.isEmpty(emptyRequiredFields);
  const errors = isValid ? [] : emptyRequiredFields.map(field => `'${field.label}' field is required`);

  return [isValid, errors];
};

export const validatePassword = (password) => password.length >= 6;

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
