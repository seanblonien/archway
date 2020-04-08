import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {parentRoutePropTypes, routesPropTypes} from '../PropTypesConfig';

const StandardRoute = ({path, routes, parentRoute, component: Component}) => (
  <Route
    path={path} render={(props) => (
      <Component {...props} routes={routes && routes.map(route => parentRoute[route])}/>
    )}
  />
);

StandardRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  ...parentRoutePropTypes,
  ...routesPropTypes,
};

export default StandardRoute;
