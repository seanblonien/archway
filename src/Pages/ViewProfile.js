import React from 'react';
import { strapi, strapiURL } from "../constants";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                _id: '',
                username: '',
                email: '',
                Fullname: '',
                ProfilePicture: { url: '' }
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        // Get the data for the user in question
        let response = await strapi.axios.get(strapiURL + '/users',
            {
                params: {
                    username: this.props.match.params.username
                }
            });

        // Check to see if the user has a profile picture. If not, load the default one
        if (response.data[0]['ProfilePicture'] === null) {
            response.data[0]['ProfilePicture'] = { url: '/uploads/a7eb2b33209b4edd992a1ba465304f7f.png' }; //TODO: fix constant value (this is the default image which must exist in strapi)
        }

        this.setState({ user: response.data[0] });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }


    handleSubmit(event) {
        // todo: add authentication
        strapi.axios.put(strapiURL + '/content-manager/explorer/plugins::users-permissions.user/' + this.state.user._id, this.state.user);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Profile Settings</h1>
                <Divider/>
                <Grid container justify="center">
                    <Grid item>
                        {
                            <img src={strapiURL + this.state.user.ProfilePicture.url} alt="profile"
                                style={{
                                    border: '5px solid black', borderRadius: '12px',
                                    marginTop: '12px', width: '300px', height: '300px'
                                }}>
                            </img>
                        }
                        <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </Grid>
                </Grid>
                <Divider/>
                <h2>Main Settings</h2>
                <TextField
                    name="Fullname"
                    label="Full name"
                    margin="dense"
                    style={{ width: 500 }}
                    onChange={this.handleChange}
                    value={this.state.user.Fullname}
                />
                <br />
                <TextField
                    name="email"
                    label="Email"
                    margin="dense"
                    style={{ width: 500 }}
                    onChange={this.handleChange}
                    value={this.state.user.email}
                />
                <br />
                <label>Phone </label>
                <br />
                <label>LinkedIn</label>
                <Divider/>
                <Button onClick={this.handleSubmit}>
                    Update Profile
                </Button>
            </div>
        );
    }
}

export default ViewProfile;