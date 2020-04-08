import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Login from '../Components/Auth/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto'
  }
}));

const AuthPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
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
    </Box>
  );
};
export default AuthPage;
