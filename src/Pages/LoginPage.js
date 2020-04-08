import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Login from '../Components/Login';
import Box from '@material-ui/core/Box';

const LoginPage = () => (
  <Grid
    container
    direction='column'
    alignItems='center'
    component={Box} my={5}
  >
    <Grid item xs={12} sm={8} md={6} xl={6} component={Paper} elevation={6} my={10}>
      <Login/>
    </Grid>
  </Grid>
);

export default LoginPage;
