/*
Filename: LoadingCircle.js
Contributors: Ryan Cave
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function LoadingCircle(props) {
    const { classes } = props;
    return (
        <div>
            <Grid container justify = "center" alignItems="center" >
                <CircularProgress className={classes.progress} />
            </Grid>
            <div>
                <Typography variant="overline" align="center" color="secondary">
                    LOADING CONTENT
                </Typography>
            </div>
        </div>

    );
}

LoadingCircle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingCircle);