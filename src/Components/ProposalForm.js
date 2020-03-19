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

class ProposalForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      open: false,
      Department: '',
      departmentList: [],
      email: '',
      phone: '',
      title: '',
      description: '',
      deliverables: '',
      intellectualProperty: false,
      nondisclosure: false,
      financialSupport: '',
      projectUse: ''
    };
  }

  async componentDidMount() {
    const departmentList = await api.departments.find();
    this.setState({departmentList});
  }

  handleChange = name => event => {
    const {departmentList} = this.state;
    this.setState({[name]: event.target.value});

    if (name === 'Department') {
      const department = departmentList.find(d => d.name === event.target.value);
      if(department){
        this.setState({[name]: department});
      }
    }
  };

  handleCheck = name => event => {
    this.setState({[name]: event.target.checked});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {email, phone, title, description, deliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, Department} = this.state;

    // TODO update to check for create/update
    await api.proposals.create({
      email,
      phone,
      title,
      description,
      deliverables,
      intellectualProperty,
      nondisclosure,
      financialSupport,
      projectUse,
      Department: Department.id,
      status: 'Not Submitted',
      date: new Date()
    });

    this.setState({open: false});
  };

  handleSubmit = async () => {
    const {email, phone, title, description, deliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, Department} = this.state;

    await api.proposals.create({
      email,
      phone,
      title,
      description,
      deliverables,
      intellectualProperty,
      nondisclosure,
      financialSupport,
      projectUse,
      Department: Department.id,
      status: 'Submitted',
      date: new Date()
    });

    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    const {open, email, phone, title, description, deliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, Department, departmentList} = this.state;

    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          New Proposal
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth
          maxWidth='md'
        >
          <DialogTitle id='form-dialog-title'>Proposal Request Form</DialogTitle>
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
                    margin='dense'
                    label='Contact Email Address'
                    type='email'
                    fullWidth
                    required
                    value={email}
                    onChange={this.handleChange('email')}
                  />
                  <TextField
                    margin='dense'
                    label='Contact Phone Number'
                    fullWidth
                    value={phone}
                    onChange={this.handleChange('phone')}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.section}>
              <TextField
                margin='dense'
                label='Project Title'
                fullWidth
                value={title}
                onChange={this.handleChange('title')}
              />
              <FormControl className={classes.formMargin}>
                <InputLabel>Department</InputLabel>
                <Select
                  native
                  value={Department.name}
                  onChange={this.handleChange('Department')}
                >
                  <option value=''> </option>
                  {departmentList.map(dept => (
                    <option value={dept.name}>{dept.name}</option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.section}>
              <TextField
                multiline
                rows='4'
                fullWidth
                label='Project Description'
                value={description}
                onChange={this.handleChange('description')}
              />
              <TextField
                multiline
                rows='4'
                fullWidth
                label='Project Deliverables'
                value={deliverables}
                onChange={this.handleChange('deliverables')}
              />
            </div>
            <div className={classes.section}>
              <Grid>
                <Typography>Special Considerations</Typography>
                <FormControlLabel
                  control={
                    <Checkbox checked={intellectualProperty}  onChange={this.handleCheck('intellectualProperty')}/>
                  }
                  label='Intellectual Property Agreement Required'
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={nondisclosure} onChange={this.handleCheck('nondisclosure')}/>
                  }
                  label='Non-Disclosure Agreement Required'
                />
              </Grid>
            </div>
            <div className={classes.section}>
              <Typography>Enter financial support that the sponsoring organization is willing to give.
                (Standard project fee is 5,000)
              </Typography>
              <TextField
                margin='dense'
                label='Finacial support'
                value={financialSupport}
                onChange={this.handleChange('financialSupport')}
              />
            </div>
            <div className={classes.section}>
              <Typography>{'Describe the project\'s intended use'}</Typography>
              <TextField
                multiline
                rows='2'
                fullWidth
                label='Project Use'
                value={projectUse}
                onChange={this.handleChange('projectUse')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color='primary'>
              Save
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }
}

export default compose(
  withStyles(styles)
)(ProposalForm);
