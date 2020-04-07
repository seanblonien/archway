import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {routesDefaultProps, routesPropTypes} from '../PropTypesConfig';

const StandardRoute = ({path, routes, component: Component}) => (
  <Route
    path={path} render={(props) => (
      <Component {...props} routes={routes}/>
    )}
  />
);

StandardRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  ...routesPropTypes,
};

StandardRoute.defaultProps = routesDefaultProps;

export default StandardRoute;
