import React from 'react';
import { render } from "react-dom";
import {strapi, strapiURL} from "../constants";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            fullname: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){

        // Get the data for the user in question
        await strapi.axios.get(strapiURL + '/users',
            {
                params: {
                    username: this.props.match.params.username
                }
            }).then ((response) => {
                this.setState({user: response.data[0]});
        });
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event){
        console.log(this.state.fullname);
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
                    <div>
                        <label>Name* {this.state.user.Fullname}
                            <input name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>Email*</label>
                        <br/>
                        <label>{this.state.user.email}</label>
                    </div>
                    <div>
                        <label>Phone</label>
                    </div>
                    <div>
                        <label>LinkedIn</label>
                    </div>
                    <hr/>
                    <input type="submit" value="Update Profile"/>
                </form>
                
            </div>
        );
    }
}

export default ViewProfile;