import PropTypes from 'prop-types';
import _ from 'lodash';
import React, {useContext} from 'react';
import RolesContext from '../../Contexts/RolesContext';
import defaultRoles from './roles.json';
import permissionValues from './permissionValues.json';
import roleValues from './rolesValues.json';
import Loading from '../../Components/LoadingCircle';

// If the role exists and the permission within that role exists, return
// the value of that permission.
const check = (role, permission, roles) => _.has(roles, role) && _.has(roles[role], [permission]) && roles[role][permission];

// Renders the yes() property function if the role can perform the given action.
// Otherwise, renders the no() property function (nothing by default).
const Can = ({role, perform, yes, no}) => {
  const {roles} = useContext(RolesContext);
  if(roles){
    return (
      check(role, perform, roles)
        ? yes()
        : no()
    );
  }
  return <Loading/>;
};

Can.propTypes = {
  yes: PropTypes.func.isRequired,
  perform: PropTypes.oneOf(permissionValues).isRequired,
  no: PropTypes.func,
  role: PropTypes.oneOf(roleValues),
};

Can.defaultProps = {
  no: () => null,
  role: defaultRoles.Public
};

export default Can;
