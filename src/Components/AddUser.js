import {Box, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import {userImport} from '../constants';
import _ from 'lodash';

class AddUser extends Component {
    constructor(props) {
        super(props);

        const user = {};
        userImport.requiredFields.forEach(field => user[field] = '');
        this.state = {
            user: user
        };
    }

    handleChange = (event) => {
        if(!_.isEmpty(event.target.value)) {
            let stateToSet = {...this.state};
            stateToSet.user[event.target.name] = event.target.value;
            this.setState({stateToSet})
        }
    };

    handleSubmit = (event) => {

    };

    render() {
        return (
            <Box>
                <form noValidate autoComplete="off">
                    {userImport.requiredFields.map(field =>
                        <Box my={1}>
                            <TextField name={field}
                                       label={field}
                                       onChange={this.handleChange}
                                       required/>
                        </Box>
                    )}
                    <Button variant="contained" onClick={this.handleSubmit}>
                        Add User
                    </Button>

                    <div>
                        {(this.state.user['Fullname'])}
                    </div>
                </form>
            </Box>
        );
    }
}

export default AddUser;
