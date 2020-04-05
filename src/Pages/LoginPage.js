import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Login from '../Components/Login';
import {AuthContext} from '../Contexts/AuthProvider';

const LoginPage = ({name}) => {
  const {isAuthenticated, login} = useContext(AuthContext);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
    >
      <Grid item xs={12} sm={8} md={6} xl={6} component={Paper} elevation={6} my={10}>
        <Login/>
      </Grid>
    </Grid>
  );
};

LoginPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default LoginPage;
