import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AuthContext} from '../Contexts/AuthProvider';

const PrivateRoute = ({component: Component}, ...rest) => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Route
      {...rest} render={(props) => (
        isAuthenticated
          ? <Component {...props}/>
          : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.string
};

PrivateRoute.defaultProps = {
  location: '/'
};

export default PrivateRoute;
