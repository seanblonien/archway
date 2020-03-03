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
import FieldList from '../Components/FieldList';
import {strapi, strapiURL, userImport} from '../constants';

const initialState = {
    user: {},
    roles: [],
    validationErrors: [],
    importErrors: '',
    hasAddUser: false
};

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    // Fetches the valid roles available in Strapi
    async componentDidMount() {
        let roles = await strapi.axios.get(strapiURL + '/users-permissions/roles');
        this.setState({roles: roles.data.roles});
    }

    // Resets to the initial state and clears any generated field values
    resetState = () => {
        this.setState(initialState);
    };

    // Sets the corresponding field's value in the state, clears validation
    // errors
    handleChange = (event) => {
        const {name,  value} = event.target;
        this.setState({
            user: {...this.state.user, [name]: value},
            validationErrors: [],
            importErrors: '',
        });
    };

    // Handles submitting the user form and adding a user
    handleSubmit = async () => {
        if(this.validate()){
            const stateToSet = {hasAddUser: true};

            const user = {...this.state.user};
            user.role = this.state.roles.filter(role => role.name === user.role).map(role => role.id)[0];
            let p = [...Array(6)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
            if (!user.hasOwnProperty('password')) user['password'] = p;

            try {
                await strapi.axios.post(strapiURL + '/content-manager/explorer/plugins::users-permissions.user', user);
            } catch (err) {
                stateToSet.hasAddUser = false;
                stateToSet.importErrors = `${err.response.data.error}: ${JSON.stringify(err.response.data.message)}`;
            }
            this.setState(stateToSet);
        }
    };

    // Performs validation on the form fields
    validate = () => {
        // TODO abstract user validation to one method
        const requiredFields = userImport.fields.filter(field => field.required);
        const emptyRequiredFields = requiredFields.filter(field => _.isEmpty(this.state.user[field.name]));
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
        const {validationErrors, importErrors, hasAddUser} = this.state;

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
                        {userImport.fields &&
                            <List py={.5} dense={true}>
                                {userImport.fields.map(field =>
                                    // Render all of the fields required/optional
                                    // for the user
                                    <ListItem key={field.name} disableGutters={true}>
                                        <TextField name={field.name}
                                                   label={field.label}
                                                   onChange={this.handleChange}
                                                   required={field.required}/>
                                    </ListItem>
                                )}
                            </List>
                        }
                        <Box my={1}>
                            <Button variant="contained"
                                    onClick={this.handleSubmit}
                                    disabled={!_.isEmpty(validationErrors)}>
                                Add User
                            </Button>
                        </Box>

                        {!_.isEmpty(validationErrors) &&
                            // Display validation errors if any
                            <FieldList fields={validationErrors} label="Validation Errors"/>
                        }

                        {!_.isEmpty(importErrors) &&
                            // Display import errors if any
                            <FieldList fields={[importErrors]} label="Import Errors"/>
                        }
                    </form>
                }
            </Box>
        );
    }
}

export default AddUser;
