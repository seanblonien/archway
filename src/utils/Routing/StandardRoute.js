import React from 'react';
import {Route} from 'react-router-dom';
import _ from 'lodash';
import Can from '../../Components/Can';
import {permissions} from '../../constants';
import {parentRoutePropTypes, routeNamesPropTypes, routesPropTypes} from '../PropTypesConfig';

const StandardRoute = ({path, routeNames, parentRoute, permission, component: Component, ...rest}) => (
  <Route
    {...rest} path={path} render={(props) => (
      <Can perform={!_.isNil(permission) && !_.isEmpty(permission) ? permission : permissions.users_permissions.userspermissions.init}>
        <Component
          {...props} routes={routeNames && routeNames.reduce((obj, route) => {
            obj[route] = parentRoute[route];
            return obj;
          }, {})}
        />
      </Can>
    )}
  />
);

StandardRoute.propTypes = {
  ...routeNamesPropTypes,
  ...routesPropTypes,
  ...parentRoutePropTypes,
};

export default StandardRoute;
