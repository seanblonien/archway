import {Box, TextField, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import FieldList from '../Components/FieldList';
import {userImport} from '../constants';
import _ from 'lodash';

const initialState = {
    validationErrors: [],
    hasAddUser: false
};

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    // Resets to the initial state and clears any generated field values
    resetState = () => {
        this.setState(initialState);
        userImport.fields.forEach(field => this.setState({[field.name]: ''}));
    };

    // Sets the corresponding field's value in the state, clears validation
    // errors
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value, validationErrors: []});
    };

    // Handles submitting the user form and adding a user
    handleSubmit = (event) => {
        if(this.validate()){
            this.setState({hasAddUser: true})
        }
    };

    // Performs validation on the form fields
    validate = () => {
        const requiredFields = userImport.fields.filter(field => field.required);
        const emptyRequiredFields = requiredFields.filter(field => _.isEmpty(this.state[field.name]));
        let isValid = _.isEmpty(emptyRequiredFields);
        if(isValid){
            this.setState({validationErrors: []});
        } else {
            const errors = emptyRequiredFields.map(field => "'" + field.label + "' field is required");
            this.setState({validationErrors: errors});
        }

        return isValid;
    };

    render() {
        const {validationErrors, hasAddUser} = this.state;

        return (
            <Box my={1}>
                {hasAddUser ?
                    // Display the success message if a user has been added
                    // successfully
                    <Box>
                        <Typography variant="h5">Added User Successfully ✅</Typography>

                        <Button variant="contained" onClick={this.resetState}>
                            Add another user
                        </Button>
                    </Box>
                    :
                    // Display the add user form
                    <form noValidate autoComplete="off">
                        {userImport.fields.map(field =>
                            // Render all of the fields required/optional
                            // for the user
                            <Box p={.5}>
                                <TextField name={field.name}
                                           label={field.label}
                                           onChange={this.handleChange}
                                           required={field.required}/>
                            </Box>
                        )}
                        <Box my={1}>
                            <Button variant="contained" onClick={this.handleSubmit} disabled={!_.isEmpty(validationErrors)}>
                                Add User
                            </Button>
                        </Box>

                        {!_.isEmpty(validationErrors) &&
                            // Display validation errors if any
                            <FieldList fields={validationErrors} label="Validation Errors"/>
                        }
                    </form>
                }
            </Box>
        );
    }
}

export default AddUser;
