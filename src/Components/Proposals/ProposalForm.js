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
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import history from "../../utils/history";
import AuthContext from "../../Contexts/AuthContext";

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
      contactName: '',
      sponsoringCompany: '',
      email: '',
      phone: '',
      projectTitle: '',
      projectDescription: '',
      projectDeliverables: '',
      isIntellectualPropertyRequired: false,
      isNondisclosureRequired: false,
      financialSupport: '',
      projectUse: '',
      id: ''
    };
  }

  async componentDidMount() {
    const {user} = this.context;
    const departmentList = await api.departments.find();
    this.setState({departmentList, creator: user});
    const {proposal} = this.props;

    if (this.props.proposal !== null) {
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
        id: proposal._id
      })
    }
  }

  handleChange = name => event => {
    const {departmentList} = this.state;

    debugger;
    if (name === 'departments') {
      let departments = [];
      for (let department of departmentList) {
        for (let sel of event.target.value) {
          if (department.name === sel) {
            departments.push(department);
          }
        }
      }

      let departmentNames = event.target.value;

      this.setState({[name]: departments});
      this.setState({departmentNamesSel: departmentNames})

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
    this.setState({open: false});
  };

  handleSave = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departments, id, creator
    } = this.state;

    if (id !== '') {
      await api.proposals.update(id, {
        email,
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
        creator
      });
    } else {
      await api.proposals.create({
        email,
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
        creator
      });
    }

    this.setState({open: false});
  };

  handleSubmit = async () => {
    const {email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departments, id, creator} = this.state;


    if (id === '') {
      await api.proposals.create({
        email,
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
        creator
      });
    } else {
      await api.proposals.update(id, {
        email,
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
        creator
      });
    }

    this.setState({open: false});
  };

  render() {
    const {classes, title} = this.props;
    const {open, contactName, sponsoringCompany, email, phone, projectTitle, projectDescription, projectDeliverables, isIntellectualPropertyRequired,
      isNondisclosureRequired, financialSupport, projectUse, departmentNamesSel, departmentList} = this.state;

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
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TextField
                    autoFocus
                    margin='dense'
                    label='Contact Name'
                    fullWidth
                    value={contactName}
                    onChange={this.handleChange('contactName')}
                  />
                  <TextField
                    margin='dense'
                    label='Sponsoring Organization Name'
                    fullWidth
                    value={sponsoringCompany}
                    onChange={this.handleChange('sponsoringCompany')}
                  />
                </Grid>
                <Grid item xs={5}>
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
            </div>
            <div className={classes.section}>
              <Typography variant='subtitle2'>Departments</Typography>
              <FormControl className={classes.formMargin}>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={departmentNamesSel}
                  onChange={this.handleChange('departments')}
                  input={<Input />}
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
              <Typography>Describe the financial support that the organization is willing to provide
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

ProposalForm.contextType = AuthContext;

ProposalForm.propTypes = {
  proposal: PropTypes.object,
  title: PropTypes.string,
};

export default compose(
  withStyles(styles)
)(ProposalForm);
