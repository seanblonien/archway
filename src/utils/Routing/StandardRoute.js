import React from 'react';
import {Route} from 'react-router-dom';
import {parentRoutePropTypes, routeShapePropTypes} from '../PropTypesConfig';

const StandardRoute = ({path, routes, parentRoute, component: Component, ...rest}) => (
  <Route
    {...rest} path={path} render={(props) => (
      <Component {...props} routes={routes && routes.map(route => parentRoute[route])}/>
    )}
  />
);

StandardRoute.propTypes = {
  ...routeShapePropTypes,
  ...parentRoutePropTypes,
};

export default StandardRoute;
