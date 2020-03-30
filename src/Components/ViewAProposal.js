import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../Services/api';

const styles = {
    form: {
        fullWidth: true,
        maxWidth: 'lg'
    },
    section: {
        margin: 20
    }
};

class ViewAProposal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
            Proposal: ''
        };
    }

    async componentDidMount() {
        const departmentList = await api.departments.find();
        this.setState({departmentList});
    }


    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        return (
            <div>
                <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
                    View
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle id='form-dialog-title'>Pending Proposal</DialogTitle>

                </Dialog>
            </div>
        );

    }
}

export default compose(
    withStyles(styles)
)(ViewAProposal);
