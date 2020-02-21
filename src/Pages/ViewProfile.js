import React from 'react';
import { render } from "react-dom";
import {strapi, strapiURL} from "../constants";
import Button from '@material-ui/core/Button';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
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

    handleSubmit(){
        console.log('HELLO THERE');
    }

    render() {
        return(
            <div>
                <h1>Profile Settings</h1>
                <hr/>
                <label>Upload a profile picture</label>
                <hr/>
                <h2>Main Settings</h2>
                <div>
                    <label>Name*</label>
                    <br/>
                    <label>{this.state.user.Fullname}</label>
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
                <Button
                                type="submit"
                                //fullWidth
                                variant="contained"
                                color="primary"
                                //disabled={!this.isFormValid()}
                                onClick={() => {this.handleSubmit()}}
                                style={{marginTop: '1%'}}
                            >
                                Update Profile
                            </Button>
            </div>
        );
    }
}

export default ViewProfile;