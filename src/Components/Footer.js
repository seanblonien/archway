/*
Filename: Footer.js
Contributors:
Stephen Tate - Wrote entire file.
 */

import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import React from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';


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
                            <Link to="/Home" className={classes.linkStyle}>Home Page</Link>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <Link to="/About" className={classes.linkStyle}>About Page</Link>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <Link to="/Sponsors" className={classes.linkStyle}>Sponsor A Project</Link>
                        </Grid>
                        <Grid className={classes.gridItem} item xs={2}>
                            <img src={require('../Images/arch.svg')} alt="Powered by Archway" title="Powered by Archway" height="30" width="30"/>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <Link to="/ViewAllDepartments" className={classes.linkStyle}>Departments</Link>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <Link to="/FAQ" className={classes.linkStyle}>Help and Info</Link>
                        </Grid>
                        <Grid className={classes.gridItem} item xs>
                            <Link to="/Sponsors" className={classes.linkStyle}>View Sponsors</Link>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
)(Footer);
