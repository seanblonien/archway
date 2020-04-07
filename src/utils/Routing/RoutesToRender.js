import React from 'react';
import {Switch} from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const RoutesToRender = () => (
  <Switch>
    {routes.map((route) => <RouteWithSubRoutes key={route.path} {...route}/>)}
  </Switch>
);

export default RoutesToRender;
