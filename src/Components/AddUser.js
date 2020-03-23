import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core';
import _ from 'lodash';
import React, {Component} from 'react';
import api from '../Services/api';
import {userImport} from '../constants';
import {transformUserFields} from '../utils/utils';
import {validateAddUser} from '../utils/validation';
import FieldList from './FieldList';

const initialState = {
  user: {},
  validationErrors: [],
  importErrors: '',
  hasAddUser: false
};

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  // Sets the corresponding field's value in the state, clears validation
  // errors
  handleChange = (event) => {
    const {name,  value} = event.target;
    const {user} = this.state;

    this.setState({
      user: {...user, [name]: value},
      validationErrors: [],
      importErrors: '',
    });
  };

  // Handles submitting the user form and adding a user
  handleSubmit = async () => {
    const {user} = this.state;
    const usr = {...user};

    if(this.validate()) {
      const stateToSet = {hasAddUser: true};

      await transformUserFields(usr);

      try {
        await api.users.create(usr);
      } catch (err) {
        stateToSet.hasAddUser = false;
        stateToSet.importErrors = `${err.response.data.error}: ${JSON.stringify(err.response.data.message)}`;
      }
      this.setState(stateToSet);
    }
  };

  // Resets to the initial state and clears any generated field values
  resetState = () => {
    this.setState(initialState);
  };

  // Performs validation on the form fields
  validate = () => {
    const {user} = this.state;

    const [isValid, errors] = validateAddUser(user);
    this.setState({validationErrors: errors});

    return isValid;
  };

  render() {
    const {validationErrors, importErrors, hasAddUser} = this.state;

    return (
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
          <form noValidate autoComplete='off'>
            {userImport.fields &&
              <List py={.5} dense>
                {userImport.fields.map(field =>
                // Render all of the fields required/optional
                // for the user
                  <ListItem key={field.name} disableGutters>
                    <TextField
                      name={field.name}
                      label={field.label}
                      onChange={this.handleChange}
                      required={field.required}
                    />
                  </ListItem>
                )}
              </List>
            }
            <Box my={1}>
              <Button
                variant='contained'
                onClick={this.handleSubmit}
                disabled={!_.isEmpty(validationErrors)}
              >
                Add User
              </Button>
            </Box>

            {!_.isEmpty(validationErrors) &&
              // Display validation errors if any
              <FieldList fields={validationErrors} label='Validation Errors'/>
            }

            {!_.isEmpty(importErrors) &&
              // Display import errors if any
              <FieldList fields={[importErrors]} label='Import Errors'/>
            }
          </form>
        }
      </Box>
    );
  }
}

export default AddUser;
