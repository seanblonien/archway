import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';

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
  routes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired
  }))
};

StandardRoute.defaultProps = {
  routes: []
};

export default StandardRoute;
