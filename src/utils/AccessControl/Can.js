import PropTypes from 'prop-types';
import _ from 'lodash';
import rolesAndPermissions from './rolesAndPermissions.json';
import roles from './roles.json';
import permissionValues from './permissionValues.json';
import roleValues from './roleValues.json';

// If the role exists and the permission within that role exists, return
// the value of that permission.
const check = (role, permission) => _.has(rolesAndPermissions, role) && _.has(rolesAndPermissions[role], [permission]) && rolesAndPermissions[role][permission];

// Renders the yes() property function if the role can perform the given action.
// Otherwise, renders the no() property function (nothing by default).
const Can = ({role, perform, yes, no}) => (
  check(role, perform)
    ? yes()
    : no()
);

Can.propTypes = {
  yes: PropTypes.func.isRequired,
  perform: PropTypes.oneOf(permissionValues).isRequired,
  no: PropTypes.func,
  role: PropTypes.oneOf(roleValues),
};

Can.defaultProps = {
  no: () => null,
  role: roles.Public
};

export default Can;
