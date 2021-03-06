import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router-dom';
import {routesPropTypes} from '../PropTypesConfig';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const RoutesToRender = ({routes, switch: hasSwitch}) => {
  const subRoutes = Object.keys(routes).map((key) => {
    const route = routes[key];
    return <RouteWithSubRoutes key={route.path} {...route} parentRoute={route}/>;
  });

  return (
    hasSwitch
      ? <Switch>{subRoutes}</Switch>
      : subRoutes
  );
};

RoutesToRender.propTypes = {
  switch: PropTypes.bool,
  ...routesPropTypes
};

RoutesToRender.defaultProps = {
  switch: false
};

export default RoutesToRender;
