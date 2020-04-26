import {Box, Button, List, ListItem, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import {withSnackbar} from 'notistack';
import React, {Component} from 'react';
import {SelectValidator, TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import api from '../../Services/api';
import {snackbarPropTypes} from '../../utils/PropTypesConfig';
import {snack} from '../../utils/Snackbar';
import {transformUserFields} from '../../utils/utils';
import LoadingCircle from '../LoadingCircle';
import FieldList from './FieldList';

const requiredName = 'required';
const requiredError = 'This field is required.';
const emailName = 'isEmail';
const emailError = 'This field is required.';

export const userImportFields = [
  {
    name: 'Fullname',
    label: 'Full Name',
    validators: [requiredName],
    errors: [requiredError]
  },
  {
    name: 'email',
    label: 'Email',
    validators: [requiredName, emailName],
    errors: [requiredError, emailError]
  },
  {
    name: 'username',
    label: 'Username',
    validators: [requiredName],
    errors: [requiredError]
  },
  {
    name: 'role',
    label: 'Role',
    validators: [requiredName],
    errors: [requiredError]
  },
  {
    name: 'password',
    label: 'Password'
  }
];

const initialUser = userImportFields.reduce((obj, elem) => {
  obj[elem.name] = '';
  return obj;
}, {});

const initialState = {
  user: initialUser,
  importErrors: '',
  hasAddUser: false,
  roles: [],
  loading: true
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.fetchRoles();
  }

  fetchRoles = async () => {
    const response = await api.getRoles();
    const {roles} = response.data;
    this.setState(prevState => (
      {roles, loading: false, user: {...prevState.user, role: roles[0].name}}
    ));
  }

  // Sets the corresponding field's value in the state, clears import errors
  handleChange = (event) => {
    const {name,  value} = event.target;

    this.setState(prevState => ({
      user: {...prevState.user, [name]: value},
      importErrors: '',
    }));
  };

  // Handles submitting the user form and adding a user
  handleSubmit = async () => {
    const {user} = this.state;
    const usr = {...user};
    const stateToSet = {hasAddUser: true};
    await transformUserFields(usr);

    try {
      await api.users.create(usr);
    } catch (err) {
      stateToSet.hasAddUser = false;
      stateToSet.importErrors = err.data.message[0].messages[0].message;
    }
    this.setState(stateToSet);
  };

  // Resets to the initial state and clears any generated field values
  resetState = async () => {
    this.setState(initialState);
    await this.fetchRoles();
  };

  render() {
    const {importErrors, hasAddUser, user, roles, loading} = this.state;
    const {enqueueSnackbar} = this.props;

    const RoleOptions = roles[0] && roles.map(role => (
      <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
    ));

    return (
      loading ?
        <LoadingCircle/>
        :
        <Box my={1}>
          {hasAddUser ?
          // Display the success message if a user has been added
          // successfully
            <Box>
              <Typography variant='h5'>Added User Successfully <span role='img' aria-label='Check'>✅</span></Typography>

              <Button variant='contained' onClick={this.resetState}>
                Add another user
              </Button>
            </Box>
            :
          // Display the add user form
            <ValidatorForm onSubmit={this.handleSubmit} onError={() => enqueueSnackbar('Invalid fields', snack.error)}>
              <Grid container direction='column' spacing={1}>
                <Grid item xs>
                  <TextValidator
                    name='Fullname'
                    label='Full Name'
                    value={user.Fullname}
                    onChange={this.handleChange}
                    required
                    validators={[requiredName]}
                    errorMessages={[requiredError]}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    name='email'
                    label='Email'
                    value={user.email}
                    onChange={this.handleChange}
                    required
                    validators={[requiredName, emailName]}
                    errorMessages={[requiredError, emailError]}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    name='username'
                    label='Username'
                    value={user.username}
                    onChange={this.handleChange}
                    required
                    validators={[requiredName]}
                    errorMessages={[requiredError]}
                  />
                </Grid>
                <Grid item xs>
                  <SelectValidator
                    name='role'
                    label='Role'
                    value={user.role}
                    width='auto'
                    onChange={this.handleChange}
                    required
                    validators={[requiredName]}
                    errorMessages={[requiredError]}
                  >
                    {RoleOptions}
                  </SelectValidator>
                </Grid>
                <Grid item xs>
                  <TextValidator
                    name='password'
                    label='Password'
                    value={user.password}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs component={Box} pt={2}>
                <Button type='submit' variant='contained'>
                  Add User
                </Button>
              </Grid>

              {!_.isEmpty(importErrors) &&
                <Box my={2}>
                  <FieldList fields={[importErrors]} label='Import Errors'/>
                </Box>
              }
            </ValidatorForm>
          }
        </Box>
    );
  }
}

AddUser.propTypes = snackbarPropTypes;

export default withSnackbar(AddUser);
