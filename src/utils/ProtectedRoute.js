import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from '../Auth';

const PrivateRoute = ({component: Component}, ...rest) => (
  <Route
    {...rest} render={(props) => (
      auth.isAuthenticated()
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  })
};

PrivateRoute.defaultProps = {
  location: {pathname: '/', search: '', hash: ''}
};

export default PrivateRoute;
