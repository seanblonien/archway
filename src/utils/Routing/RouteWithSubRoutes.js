import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import StandardRoute from './StandardRoute';

const RouteWithSubRoutes = (route) => (
  route.protected
    ? <ProtectedRoute {...route}/>
    : <StandardRoute {...route}/>
);

export default RouteWithSubRoutes;
