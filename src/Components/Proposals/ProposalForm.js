import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withSnackbar} from 'notistack';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import gStyle from '../../utils/styles.module.css';
import api from '../../Services/api';
import AuthContext from '../../Contexts/AuthContext';
import {snack} from '../../utils/Snackbar';

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
      creator: '',
      departmentList: [],
      departmentNamesSel: [],
      email: '',
      phone: '',
      projectTitle: '',
      projectDescription: '',
      projectDeliverables: '',
      isIntellectualPropertyRequired: false,
      isNondisclosureRequired: false,
      financialSupport: '',
      projectUse: '',
      id: '',
      profileData: {}
    };
  }

  async componentDidMount() {
    const {user} = this.context;
    const response = await api.users.find({username: user.username});
    const profileData = response[0];
    const departmentList = await api.departments.find();
    this.setState({departmentList, creator: user, profileData});
    const {proposal} = this.props;

    if (proposal !== null) {
      const selectNames = Array.from(proposal.departments.map(d => d.name));

      this.setState({
        departments: proposal.departments,
        departmentNamesSel: selectNames,
        email: proposal.email,
        phone: proposal.phone,
        projectTitle: proposal.projectTitle,
        projectDescription: proposal.projectDescription,
        projectDeliverables: proposal.projectDeliverables,
        isIntellectualPropertyRequired: proposal.isIntellectualPropertyRequired,
        isNondisclosureRequired: proposal.isNondisclosureRequired,
        financialSupport: proposal.financialSupport,
        projectUse: proposal.projectUse,
        id: proposal.id
      });
    }
  }

  handleChange = event => {
    const {departmentList} = this.state;
    const {name} = event.target;

    if (name === 'departments') {
      const departments = [];
      for (const department of departmentList) {
        for (const sel of event.target.value) {
          if (department.name === sel) {
            departments.push(department);
          }
        }
      }

      const departmentNames = event.target.value;

      this.setState({[name]: departments});
      this.setState({departmentNamesSel: departmentNames});

    } else {
      this.setState({[name]: event.target.value});
    }
  };

  handleCheck = name => event => {
    this.setState({[name]: event.target.checked});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    const {update} = this.props;
    update();
    this.setState({open: false});
  };

  handleSave = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departments, id, creator, profileData} = this.state;
    const {enqueueSnackbar} = this.props;

    const save = {email,
      phone,
      projectTitle,
      projectDescription,
      projectDeliverables,
      isIntellectualPropertyRequired,
      isNondisclosureRequired,
      financialSupport,
      projectUse,
      departments,
      status: 'notSubmitted',
      sponsors: [profileData.sponsorOrganization],
      creator
    };

    try {
      if (id !== '') {
        await api.proposals.update(id, save);
      } else {
        await api.proposals.create(save);
      }
      enqueueSnackbar('Your changes have been saved', snack.success);
    } catch (e) {
      enqueueSnackbar('Unable to save changes.', snack.error);
    }

    this.handleClose();
  };

  handleSubmit = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departments, id, creator, profileData} = this.state;
    const {enqueueSnackbar} = this.props;

    const submit = {email,
      phone,
      projectTitle,
      projectDescription,
      projectDeliverables,
      isIntellectualPropertyRequired,
      isNondisclosureRequired,
      financialSupport,
      projectUse,
      departments,
      status: 'submittedPending',
      sponsors: [profileData.sponsorOrganization],
      creator
    };

    try {
      if (id === '') {
        await api.proposals.create(submit);
      } else {
        await api.proposals.update(id, submit);
      }
      enqueueSnackbar('Your changes have been submitted', snack.success);
    } catch (e) {
      enqueueSnackbar('Unable to save changes.', snack.error);
    }

    this.handleClose();
  };

  render() {
    const {classes, title} = this.props;
    const {open, creator, profileData, email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departmentNamesSel, departmentList, id} = this.state;

    let organizationInfo;
    if (profileData.sponsorOrganization) {
      organizationInfo = <Typography variant='h6'>Sponsoring Organization: {profileData.sponsorOrganization.name}</Typography>;
    } else {
      organizationInfo = <Typography>Your are not associated with a sponsoring organization.
        Please add your organization on your profile page.</Typography>;
    }

    return (
      <div className={gStyle.gridListContainer}>
        {id !== '' &&
          <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
            {title}
          </Button>
        }
        {id === '' &&
          <Button size='large' variant='outlined' color='primary' onClick={this.handleClickOpen}>
            {title}
          </Button>
        }
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-projectTitle'
          fullWidth
          maxWidth='md'
        >
          <DialogTitle id='form-dialog-projectTitle'>Proposal Request Form</DialogTitle>
          <DialogContent>
            <ValidatorForm onSubmit={this.handleClose}>
              <div className={classes.section}>
                <Grid container spacing={3}>
                  <Grid item xs={5}>
                    <Typography variant='h6'>Name: {creator.Fullname}</Typography>
                    <br/>
                    {organizationInfo}
                  </Grid>
                  <Grid item xs={5}>
                    <TextValidator
                      label='Contact Email Address'
                      name='email'
                      value={email}
                      fullWidth
                      onChange={this.handleChange}
                      validators={['required', 'isEmail']}
                      errorMessages={['An email is required.', 'The email is invalid.']}
                    />
                    <TextField
                      margin='dense'
                      label='Contact Phone Number'
                      name='phone'
                      fullWidth
                      value={phone}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.section}>
                <TextField
                  margin='dense'
                  name='projectTitle'
                  label='Project Title'
                  fullWidth
                  value={projectTitle}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.section}>
                <Typography variant='subtitle2'>Departments</Typography>
                <FormControl className={classes.formMargin}>
                  <Select
                    labelId='demo-mutiple-name-label'
                    id='demo-mutiple-name'
                    name='departments'
                    multiple
                    value={departmentNamesSel}
                    onChange={this.handleChange}
                    input={<Input/>}
                  >
                    {departmentList.map((dept) => (
                      <MenuItem key={dept.name} value={dept.name}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.section}>
                <TextField
                  multiline
                  name='projectDescription'
                  rows='4'
                  fullWidth
                  label='Project Description'
                  value={projectDescription}
                  onChange={this.handleChange}
                />
                <TextField
                  multiline
                  name='projectDeliverables'
                  rows='4'
                  fullWidth
                  label='Project Deliverables'
                  value={projectDeliverables}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.section}>
                <Grid>
                  <Typography>Special Considerations</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isIntellectualPropertyRequired}  onChange={this.handleCheck('isIntellectualPropertyRequired')}/>
                    }
                    label='Intellectual Property Agreement Required'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={isNondisclosureRequired} onChange={this.handleCheck('isNondisclosureRequired')}/>
                    }
                    label='Non-Disclosure Agreement Required'
                  />
                </Grid>
              </div>
              <div className={classes.section}>
                <Typography>Please describe if your organization will provide financial support and what your organization can provide.
                </Typography>
                <TextField
                  margin='dense'
                  name='financialSupport'
                  label='Financial support'
                  value={financialSupport}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.section}>
                <Typography>{'Describe the project\'s intended use'}</Typography>
                <TextField
                  multiline
                  name='projectUse'
                  rows='2'
                  fullWidth
                  label='Project Use'
                  value={projectUse}
                  onChange={this.handleChange}
                />
              </div>
            </ValidatorForm>
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

ProposalForm.contextType = AuthContext;

ProposalForm.defaultProps = {
  proposal: null
};

ProposalForm.propTypes = {
  proposal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    projectTitle: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    projectDescription: PropTypes.string,
    projectDeliverables: PropTypes.string,
    projectUse: PropTypes.string,
    financialSupport: PropTypes.string,
    isNondisclosureRequired: PropTypes.bool,
    isIntellectualPropertyRequired: PropTypes.bool,
    departments: PropTypes.isRequired,
  }),
  title: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};


export default withSnackbar(withStyles(styles) (ProposalForm));

