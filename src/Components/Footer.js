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
import Divider from "@material-ui/core/Divider";


const styles = theme =>({

    divStyle: {
        background: 'white',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        maxHeight: '120px',
        paddingTop: '5px',
        // paddingLeft: '5px',
        // paddingRight: '5px',
        //borderTop: '2px solid #535353',
    },
    textStyle: {
        color: '#535353',
        textDecoration: 'none',
        marginTop: '0px',
        marginBottom: '0px',
    },
    navigationHeading: {
        color: '#535353',
        textDecoration: 'none',
        marginTop: '0px',
        marginBottom: '5px',
        //borderBottom: '2px solid white',
    },
    gridItem: {
        paddingTop: '10px', // idk why this doesn't change things
        textAlign: 'center',
        color: '#535353',
    },
    linkStyle: {
        color: '#0366D6',
        textDecoration: 'none',
    },
});


class Footer extends React.Component{

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.divStyle}>
                <Grid container justify="center" >
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Divider light={true}/>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{paddingTop: 30, paddingBottom: 40}}>
                        <Grid container justify="center" style={{paddingLeft: 250, paddingRight: 250}}>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/Home" className={classes.linkStyle}>Home Page</a>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/About" className={classes.linkStyle}>About Page</a>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/Sponsors" className={classes.linkStyle}>Sponsor A Project</a>
                        </Grid>
                        <Grid className={classes.gridItem} item xs={2}>
                            <img src={require('../Images/arch.svg')} alt="archway" height="30" width="30"/>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/ViewAllDepartments" className={classes.linkStyle}>Departments</a>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/FAQ" className={classes.linkStyle}>Help and Info</a>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <a href="/Sponsors" className={classes.linkStyle}>View Sponsors</a>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*<div>
                    <Typography className={classes.navigationHeading}>
                        <b>Navigation</b>
                    </Typography>
                    <Grid container justify="center">
                        <Grid item xs={8} md={10}>
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
                        <Grid item xs={4} md={2}>
                            <Typography variant="body1" className={classes.textStyle}>
                                Powered by Archway&nbsp;
                                <img src={require('../Images/arch.svg')} alt="archway" height="30" width="30"/>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>*/}
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
)(Footer);