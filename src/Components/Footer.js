/*
Filename: Footer.js
Contributors:
Stephen Tate - Wrote entire file.
 */

import React from 'react';
import {withStyles} from "@material-ui/core";
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme =>({

    divStyle: {
        background: theme.palette.primary.main,
        width: '100%',
        bottom: 0,
        position: 'absolute',
        maxHeight: '120px',
        paddingTop: '5px',
        paddingLeft: '5px',
    },
    textStyle: {
        color: 'white',
        textDecoration: 'none',
        marginTop: '0px',
        marginBottom: '0px',
    },
    navigationHeading: {
        color: 'white',
        textDecoration: 'none',
        marginTop: '0px',
        marginBottom: '5px',
        borderBottom: '2px solid white'
    }
});


class Footer extends React.Component{

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.divStyle}>
                <div>
                    <Grid container justify="center">
                        <Grid item xs={12} md={10}>
                            <Typography className={classes.navigationHeading}>
                                <b>Navigation</b>
                            </Typography>
                            <Grid container>
                                <Grid item xs={4} md={2}>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/Home" className={classes.textStyle}>Home Page</a>
                                    </Typography>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/About" className={classes.textStyle}>About Page</a>
                                    </Typography>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/Sponsors" className={classes.textStyle}>Sponsor A Project</a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/ViewAllDepartments" className={classes.textStyle}>Departments</a>
                                    </Typography>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/FAQ" className={classes.textStyle}>Help and Info</a>
                                    </Typography>
                                    <Typography variant="body2" className={classes.textStyle}>
                                        <a href="/Sponsors" className={classes.textStyle}>View Sponsors</a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={2}>

                                </Grid>
                                <Grid item xs={4} md={2}>

                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
)(Footer);