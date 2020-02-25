import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles = {    
form: {
    fullWidth: true,
    maxWidth: 'lg'
},
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

class ProposalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                New Proposal
            </Button>
            <Dialog 
                open={this.state.open} 
                onClose={this.handleClose} 
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth='md'>
                <DialogTitle id="form-dialog-title">Proposal Request Form</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <DialogContentText>
                                Name: Emily Tracey
                            </DialogContentText>
                            <DialogContentText>
                                Company: Baylor University
                            </DialogContentText>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Contact Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Contact Phone Number"
                            type="email"
                            fullWidth
                        />
                        </Grid>
                    </Grid>
                    <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Project Title"
                            type="email"
                            fullWidth
                        /> 
                    <FormControl className={classes.formControl}>
                        <InputLabel>Department</InputLabel>
                        <Select
                        multiple
                        input={<Input />}
                        value={names}
                        >
                        {names.map(name => (
                            <MenuItem key={name} value={name}>
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Save
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );

    }
}

export default compose(
    withStyles(styles))(ProposalForm);