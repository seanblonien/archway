/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import _ from 'lodash';
import {useContext} from 'react';
import AuthContext from '../Contexts/AuthContext';
import RolesContext from '../Contexts/RoleProvider';
import defaultRoles from '../utils/AccessControl/roles.json';
import permissionValues from '../utils/AccessControl/permissionValues.json';
import roleValues from '../utils/AccessControl/rolesValues.json';

// If the role exists and the permission within that role exists, return
// the value of that permission.
const check = (role, permission, roles) => _.has(roles, role)
  && _.has(roles[role], [permission])
  && roles[role][permission];

/**
 * Renders the children of this component if the role can perform the given
 * permission(s). Otherwise, renders the no() property method (nothing by
 * default).
 *
 * @param role what role that is being used to check for the permission
 * @param perform what permission(s) to perform
 * @param children the component that will render if permitted
 * @param no the component that will render if not permitted
 * @returns {string} JSX to render
 */
const Can = ({role, perform, children, no}) => {
  const {isAuthenticated, user} = useContext(AuthContext);
  // Update the
  if(isAuthenticated && role === defaultRoles.Public){
    role = user && user.role ?  user.role.name : role;
  }
  // Access the roles
  const {roles} = useContext(RolesContext);
  // Convert single string to array form
  const performs = [].concat(perform);

  // Check all of the perform permissions
  return roles && _.isEmpty(performs.filter(p => !check(role, p, roles)))
    ? children
    : no();
};

Can.propTypes = {
  children: PropTypes.node.isRequired,
  perform: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(permissionValues).isRequired).isRequired,
    PropTypes.string.isRequired]).isRequired,
  no: PropTypes.func,
  role: PropTypes.oneOf([...roleValues,'']),
};

Can.defaultProps = {
  no: () => null,
  role: defaultRoles.Public
};

export default Can;
