import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const LoadingCircle = () => (
  <>
    <Grid container justify='center' alignItems='center'>
      <Box m={2}>
        <CircularProgress/>
      </Box>
    </Grid>
  </>
);

export default LoadingCircle;
