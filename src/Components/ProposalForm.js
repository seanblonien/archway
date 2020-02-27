import React from 'react';
import {strapi, strapiURL} from "../constants";
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { Typography, Divider } from '@material-ui/core';
import { ThemeConsumer } from 'styled-components';
import { createClassExpression } from 'typescript';

const styles = {    
    form: {
        fullWidth: true,
        maxWidth: 'lg'
    },
    section: {
        margin: 20
    }
};


class ProposalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            open: false,
            Department: '',
            departmentList: [],
            projectTitle: '',
            projectDescription: '',
            projectDeliverables: '',
            intellectualProperty: false,
            nondisclosure: false,
            financialSupport: 0,
            projectUse: ''
        }
    }

    async componentDidMount() {
        const depts = await strapi.getEntries('departments');
        this.setState({departmentList: depts});
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };
    
    handleSave = () => {
        let authToken = 'Bearer ' + localStorage.getItem('USERTOKEN');

        strapi.axios.post(strapiURL + '/proposals', {
            projectTitle: this.state.projectTitle,
            projectDescription: this.state.projectDescription,
            projectDeliverables: this.state.projectDeliverables,
            intellectualProperty: this.state.intellectualProperty,
            nondisclosure: this.state.nondisclosure,
            financialSupport: this.state.financialSupport,
            projectUse: this.state.projectUse,
            department: this.state.Department.id,
            status: "Submitted",
        })
        


        this.setState({open: false});
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });

        if (name === "Department"){
            for (let i = 0; i < this.state.departmentList.length; i++){
                if (this.state.departmentList[i].name === event.target.value){
                    this.setState({[name]: this.state.departmentList[i]});
                    break;
                }
            }
        }

    };

    handleCheck = name => event => {
        this.setState({ [name]: event.target.checked });
    }
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
                    <div className={classes.section}>
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
                                label="Contact Email Address"
                                type="email"
                                fullWidth
                                required
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Contact Phone Number"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    </div>
                    <div className={classes.section}>
                    <TextField
                        margin="dense"
                        label="Project Title"
                        fullWidth
                        value={this.state.projectTitle}
                        onChange={this.handleChange('projectTitle')}
                    />
                    <FormControl className={classes.formMargin}>
                        <InputLabel>Department</InputLabel>
                        <Select
                            native
                            value={this.state.Department.name}
                            onChange={this.handleChange('Department')}
                        >
                            <option value={""}> </option>
                            {this.state.departmentList.map(dept => (
                                <option value={dept.name}>{dept.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    </div>
                    <div className={classes.section}>
                        <TextField
                            label="Multiline"
                            multiline
                            rows="4"
                            fullWidth
                            label="Project Description"
                            value={this.state.projectDescription}
                            onChange={this.handleChange('projectDescription')}
                        />
                        <TextField
                            label="Multiline"
                            multiline
                            rows="4"
                            fullWidth
                            label="Project Deliverables"
                            value={this.state.projectDeliverables}
                            onChange={this.handleChange('projectDeliverables')}
                        />
                    </div>
                    <div className={classes.section}>
                    <Grid>
                        <Typography>Special Considerations</Typography>
                        <FormControlLabel
                            control={
                            <Checkbox checked={this.state.intellectualProperty}  onChange={this.handleCheck('intellectualProperty')}/>
                            }
                            label="Intellectual Property Agreement Required"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={this.state.nondisclosure} onChange={this.handleCheck('nondisclosure')}/>
                            }
                            label="Non-Disclosure Agreement Required"
                        />
                    </Grid>
                    </div>
                    <div className={classes.section}>
                    <Typography>Enter financial support that the sponsoring organization is willing to give.
                        (Standard project fee is 5,000)
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Finacial support"
                        value={this.state.financialSupport}
                        onChange={this.handleChange('financialSupport')}
                    /> 
                    </div>
                    <div className={classes.section}>
                        <Typography>Describe the project's intended use</Typography>
                        <TextField
                            label="Multiline"
                            multiline
                            rows="2"
                            fullWidth
                            label="Project Use"
                            value={this.state.projectUse}
                            onChange={this.handleChange('projectUse')}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleSave} color="primary">
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