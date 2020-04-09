import React from 'react';
import {Route} from 'react-router-dom';
import {parentRoutePropTypes, routeNamesPropTypes, routesPropTypes} from '../PropTypesConfig';

const StandardRoute = ({path, routeNames, parentRoute, component: Component, ...rest}) => (
  <Route
    {...rest} path={path} render={(props) => (
      <Component
        {...props} routes={routeNames && routeNames.reduce((obj, route) => {
          obj[route] = parentRoute[route];
          return obj;
        }, {})}
      />
    )}
  />
);

StandardRoute.propTypes = {
  ...routeNamesPropTypes,
  ...routesPropTypes,
  ...parentRoutePropTypes,
};

export default StandardRoute;
