import _ from 'lodash';
import {userImport} from './constants';

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
