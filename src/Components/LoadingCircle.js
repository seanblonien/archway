import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function LoadingCircle(props) {
  const {classes} = props;
  return (
    <div>
      <Grid container justify = 'center' alignItems='center'>
        <CircularProgress className={classes.progress}/>
      </Grid>
      <div>
        <Typography variant='overline' align='center' color='secondary'>
          LOADING CONTENT
        </Typography>
      </div>
    </div>

  );
}

LoadingCircle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(LoadingCircle);
