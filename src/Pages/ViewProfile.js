import React from 'react';
import { render } from "react-dom";
import {strapi, strapiURL} from "../constants";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                confirmed: '',
                blocked: '',
                _id: '',
                username: '',
                password: '',
                email: '',
                Fullname: '',
                provider: '',
                createdAt: '',
                updatedAt: ''
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){

        // Get the data for the user in question
        let response = await strapi.axios.get(strapiURL + '/users',
            {
                params: {
                    username: this.props.match.params.username
                }
            });
        this.setState({user: response.data[0]});
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({user: {...this.state.user, [name]: value}});
    }


    handleSubmit(event){
        // todo: add authentication
        strapi.axios.put(strapiURL + '/content-manager/explorer/plugins::users-permissions.user/' + this.state.user._id, this.state.user);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1>Profile Settings</h1>
                <hr/>
                <label>Upload a profile picture</label>
                <hr/>
                <h2>Main Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="Fullname"
                        label="Full name"
                        margin="dense"
                        variant="outlined"
                        style={{width: 500}}
                        onChange={this.handleChange}
                        value={this.state.user.Fullname}
                    />
                    <br/>
                    <label>Email*</label>
                    <br/>
                    <label>{this.state.user.email}</label>
                    <br/>
                    <label>Phone</label>
                    <br/>
                    <label>LinkedIn</label>
                    <hr/>
                    <input type="submit" value="Update Profile"/>
                </form>
                
            </div>
        );
    }
}

export default ViewProfile;