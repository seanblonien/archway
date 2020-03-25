import PropTypes from 'prop-types';
import _ from 'lodash';
import {useContext} from 'react';
import RolesContext from '../Contexts/RolesContext';
import defaultRoles from '../utils/AccessControl/roles.json';
import permissionValues from '../utils/AccessControl/permissionValues.json';
import roleValues from '../utils/AccessControl/rolesValues.json';

// If the role exists and the permission within that role exists, return
// the value of that permission.
const check = (role, permission, roles) => _.has(roles, role)
  && _.has(roles[role], [permission])
  && roles[role][permission];

// Renders the yes() property function if the role can perform the given action.
// Otherwise, renders the no() property function (nothing by default).
const Can = ({role, perform, children, no}) => {
  const {roles} = useContext(RolesContext);
  return roles && check(role, perform, roles)
    ? children
    : no();
};

Can.propTypes = {
  children: PropTypes.node.isRequired,
  perform: PropTypes.oneOf(permissionValues).isRequired,
  no: PropTypes.func,
  role: PropTypes.oneOf(roleValues),
};

Can.defaultProps = {
  no: () => null,
  role: defaultRoles.Public
};

export default Can;
