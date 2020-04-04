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
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';

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

    this.state = {
      open: false,
      departments: [],
      departmentList: [],
      email: '',
      phone: '',
      projectTitle: '',
      projectDescription: '',
      projectDeliverables: '',
      intellectualProperty: false,
      nondisclosure: false,
      financialSupport: '',
      projectUse: '',
      id: ''
    };
  }

  async componentDidMount() {
    const departmentList = await api.departments.find();
    this.setState({departmentList});

    if (this.props.proposal !== null) {
      const {proposal} = this.props;
      this.setState({
        departments: proposal.departments,
        email: proposal.email,
        phone: proposal.phone,
        projectTitle: proposal.projectTitle,
        projectDescription: proposal.projectDescription,
        projectDeliverables: proposal.projectDeliverables,
        intellectualProperty: proposal.intellectualProperty,
        nondisclosure: proposal.nondisclosure,
        financialSupport: proposal.financialSupport,
        projectUse: proposal.projectUse,
        id: proposal._id
      })
    }
  }

  handleChange = name => event => {
    const {departmentList} = this.state;
    this.setState({[name]: event.target.value});

    if (name === 'departments') {
      const department = departmentList.find(d => d.name === event.target.value);
      let departments = this.state.departments;
      departments.push(department);

      if(department){
        this.setState({[name]: departments});
      }
    }
  };

  handleCheck = name => event => {
    this.setState({ ...state, [event.target.name]: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, departments, id} = this.state;

    if (id !== '') {
      await api.proposals.update(id, {
        email,
        phone,
        projectTitle,
        projectDescription,
        projectDeliverables,
        intellectualProperty,
        nondisclosure,
        financialSupport,
        projectUse,
        departments,
        status: 'notSubmitted',
      });
    } else {
      await api.proposals.create({
        email,
        phone,
        projectTitle,
        projectDescription,
        projectDeliverables,
        intellectualProperty,
        nondisclosure,
        financialSupport,
        projectUse,
        departments,
        status: 'notSubmitted',
      });
    }

    this.setState({open: false});
  };

  handleSubmit = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, departments, id} = this.state;


    if (id === '') {
      await api.proposals.create({
        email,
        phone,
        projectTitle,
        projectDescription,
        projectDeliverables,
        intellectualProperty,
        nondisclosure,
        financialSupport,
        projectUse,
        departments,
        status: 'submittedUnapproved',
        dateSubmitted: new Date()
      });
    } else {
      await api.proposals.update(id, {
        email,
        phone,
        projectTitle,
        projectDescription,
        projectDeliverables,
        intellectualProperty,
        nondisclosure,
        financialSupport,
        projectUse,
        departments,
        status: 'submittedUnapproved',
        dateSubmitted: new Date()
      });
    }

    this.setState({open: false});
  };

  render() {
    const {classes, title} = this.props;
    const {open, email, phone, projectTitle, projectDescription, projectDeliverables, intellectualProperty,
      nondisclosure, financialSupport, projectUse, departments, departmentList} = this.state;

    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-projectTitle'
          fullWidth
          maxWidth='md'
        >
          <DialogTitle id='form-dialog-projectTitle'>Proposal Request Form</DialogTitle>
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
                value={projectTitle}
                onChange={this.handleChange('projectTitle')}
              />
              <FormControl className={classes.formMargin}>
                <InputLabel>Departments</InputLabel>
                <Select
                  native
                  value={ departments.name}
                  onChange={this.handleChange('departments')}
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
                value={projectDescription}
                onChange={this.handleChange('projectDescription')}
              />
              <TextField
                multiline
                rows='4'
                fullWidth
                label='Project Deliverables'
                value={projectDeliverables}
                onChange={this.handleChange('projectDeliverables')}
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
                label='Financial support'
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

ProposalForm.propTypes = {
  proposal: PropTypes.isRequired,
  title: PropTypes.isRequired,
};

export default compose(
  withStyles(styles)
)(ProposalForm);
