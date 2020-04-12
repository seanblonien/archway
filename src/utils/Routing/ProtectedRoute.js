import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import {locationDefaultProps, locationPropTypes} from '../PropTypesConfig';
import StandardRoute from './StandardRoute';

const PrivateRoute = (route) => {
  const {isAuthenticated} = useContext(AuthContext);

  return isAuthenticated
    ? <StandardRoute {...route}/>
    : <Redirect to={{pathname: '/', state: {from: route.location}}}/>;
};

PrivateRoute.propTypes = locationPropTypes;
PrivateRoute.defaultProps = locationDefaultProps;

export default PrivateRoute;
