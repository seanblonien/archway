import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import permissions from '../utils/AccessControl/permissionValues.json';

const RolesContext = React.createContext(undefined);

class RolesProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roles: undefined
    };
  }

  async componentDidMount () {
    // Fetch all of the role IDs
    let rolesResponse = await api.getRoles();
    // Fetch all of the roles by their ID with their permission values
    const rolesPromises = rolesResponse.data.roles.map(role => api.getRole(role.id));
    rolesResponse = await Promise.all(rolesPromises);
    const rolesData = rolesResponse.map(role => role.data.role);

    // With reach role, construct a roles object with (key,value) pair of
    // (role name, role permissions)
    const roles = rolesData.reduce((rolesObj, role) => {
      // Construct the permissions array for the role mapping each available
      // permission to the actual permission value within the role object
      rolesObj[role.name] = permissions.reduce((permsObj, perm) => {
        // Split the permission key into its respective parts
        const permArray = perm.split('.');
        // Assign the permission value to the value within the role object,
        // using the permission key split into its 3 parts
        permsObj[perm]  = role.permissions[permArray[0]].controllers[permArray[1]][permArray[2]].enabled;
        return permsObj;
      }, {});
      return rolesObj;
    }, {});

    this.setRoles(roles);
  }

  setRoles = async (roles) => {
    if(roles) {
      this.setState({roles: roles});
    }
  };

  render() {
    const {children} = this.props;
    const {roles} = this.state;
    const {setRoles} = this;

    return (
      <RolesContext.Provider value={{roles, setRoles}}>
        {children}
      </RolesContext.Provider>
    );
  }
}

RolesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default RolesContext;

export {RolesProvider};
