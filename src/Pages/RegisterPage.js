import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Register from '../Components/Auth/Register';
import Box from '@material-ui/core/Box';

const RegisterPage = () => (
  <Grid
    container
    direction='column'
    alignItems='center'
    component={Box} my={5}
  >
    <Grid item xs={12} sm={8} md={6} xl={6} component={Paper} elevation={6} my={10}>
      <Register/>
    </Grid>
  </Grid>
);

export default RegisterPage;