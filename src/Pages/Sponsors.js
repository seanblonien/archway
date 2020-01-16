/*
Filename: Sponsors.js
Contributors:
Ryan Cave - Created the Get Involved modal and made information post to back-end.
Greg - page design
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {strapiURL} from "../constants";
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth/withWidth";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {university} from '../constants';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as url from "../Images/businessmen.jpg";


const styles = theme => ({
    button: {
        border: '4px solid currentColor',
        borderRadius: 0,
        height: 'auto',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px`,
    },
    bgImage: {
        width: '100%',
        height: '800px',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover'
    }
});


class Sponsors extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            name: '',
            email: '',
            company: '',
        };
    }

    handleClickOpen = () =>{
        this.setState({ open: true });
    };

    handleClose = () =>{
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () =>{
        this.setState({open: false});

        let url = strapiURL + '/Sponsorrequests';

        axios.post(url, {
            Name: this.state.name,
            Email: this.state.email,
            Company: this.state.company,
        });

        window.location.reload(true);
    };




    render() {
        const { classes } = this.props;

        return (
            <div>
                    <div className={classes.bgImage}>
                        <Grid container justify="center" direction="column" alignItems="center">
                            <Grid item xs={12} md={4}>
                                <Typography variant="display3" color="textPrimary" align="center" gutterBottom>
                                    Sponsorship Opportunity
                                </Typography>

                                <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
                                    Why join {university}?
                                    <br />
                                </Typography>

                                    <Divider />
                                    <br/>
                            </Grid>

                            <Grid item xs={12} md={4} alignContent="flex-start">
                                <Typography variant="subtitle2" color="inherit" align="center" gutterBottom>
                                    <Card style={{justifyContent: "center"}}>
                                        <CardContent>
                                            <br />
                                            <li>Sponsors benefit from mutual partnerships with {university}</li>
                                            <br />
                                            <li>Sponsors see an uptick in profits via site-wide advertisements</li>
                                            <br />
                                            <li>Work with and mentor students for potential recruiting opportunities</li>
                                            <br />
                                            <li>Receive valuable work products as end results of student projects</li>
                                        </CardContent>
                                    </Card>
                                </Typography>
                            </Grid>
                        <br />
                            <Grid item xs={12} md={4}>
                                <Typography variant="overline" color="inherit" align="center" gutterBottom>
                                    If your organization is interested in becoming a sponsor, please click below to let us know.
                                </Typography>

                                <div align="center">
                                    <Button className={classes.button} onClick={this.handleClickOpen}>
                                        <Typography color="primary" variant="h6" component="span">
                                            Get Involved
                                        </Typography>
                                    </Button>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                    >
                                        <DialogTitle>Get Involved</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                If you are interested in sponsoring a future capstone, please enter your contact information here. We will reach out with additional information.
                                            </DialogContentText>
                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Name"
                                                type="text"
                                                fullWidth
                                                value={this.state.name}
                                                onChange={(event) => this.setState({name: event.target.value})}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="email"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                value={this.state.email}
                                                onChange={(event) => this.setState({email: event.target.value})}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="company"
                                                label="Company"
                                                type="text"
                                                fullWidth
                                                value={this.state.company}
                                                onChange={(event) => this.setState({company: event.target.value})}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.handleSubmit} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
            </div>
        )
    }
}

export default (withStyles(styles)(withWidth()(Sponsors)));