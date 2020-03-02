import React from 'react';
import { strapi, strapiURL } from "../constants";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
            response.data[0]['ProfilePicture'] = { url: require('../Images/default-user-profile-image-png-6.png') }; //TODO: fix constant value (this is the default image which must exist in strapi)
        } else {
            let url = response.data[0]['ProfilePicture']['url'];
            response.data[0]['ProfilePicture']['url'] = strapiURL + url;
        }

        this.setState({ user: response.data[0] });
    }

    handleRemoveProfilePic(){
        strapi.axios.delete(strapiURL + '/upload/files/' + this.state.user.ProfilePicture._id);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }


    handleSubmit(event) {
        // todo: add authentication
        //strapi.axios.put(strapiURL + '/content-manager/explorer/plugins::users-permissions.user/' + this.state.user._id, this.state.user);
        strapi.axios.put(strapiURL + '/users/' + this.state.user._id, this.state.user); // enable users-permissions: update
        event.preventDefault();
    }

    render() {
        return (
            <Box width="50%" mx="auto">
                <Typography variant="h2">Profile Settings</Typography>
                <Divider/>
                <Grid container direction="column" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <img src={this.state.user.ProfilePicture.url} alt="profile"
                            style={{
                                border: '5px solid black', borderRadius: '12px',
                                marginTop: '12px', width: '300px', height: '300px'
                            }}>
                        </img>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant = "contained" onClick={() => {this.handleRemoveProfilePic()}}>
                            Remove Profile Picture
                        </Button>
                    </Grid>
                    
                </Grid>
                <Divider/>
                <Typography variant="h3">Main Settings</Typography>
                <Grid container direction="row" justify="left" spacing={2}>
                    <Grid item>
                        <TextField
                        name="Fullname"
                        label="Full name"
                        margin="dense"
                        style={{ width: 500 }}
                        onChange={this.handleChange}
                        value={this.state.user.Fullname}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        name="email"
                        label="Email"
                        margin="dense"
                        style={{ width: 500 }}
                        onChange={this.handleChange}
                        value={this.state.user.email}
                        />
                    </Grid>
                </Grid>
                <Divider/>
                <Button variant="contained" onClick={this.handleSubmit}>
                    Update Profile
                </Button>
            </Box>
        );
    }
}

export default ViewProfile;