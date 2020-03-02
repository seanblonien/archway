import React from 'react';
import { strapi, strapiURL } from "../constants";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            user: {
                _id: '',
                username: '',
                email: '',
                Fullname: '',
                ProfilePicture: { url: '' }
            },
        };

        this.handleRemoveProfilePic = this.handleRemoveProfilePic.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        this.setState({ user: response.data[0], editing: false });
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
        strapi.axios.put(strapiURL + '/users/' + this.state.user._id, this.state.user); // must enable users-permissions: update
        this.setState({editing: false});
        event.preventDefault();
    }

    handleEdit(){
        this.setState({editing: true});
    }

    handleCancel(){
        this.setState({editing: false});
    }

    render() {
        return (
            <Box width="50%" mx="auto">
                <Box my={2}>
                    {(this.state.editing)?
                        (
                            <Typography variant="h3">Profile Settings</Typography>
                        ):
                        (
                            <Typography variant="h3">Profile: {this.state.user.Fullname}</Typography>
                        )
                    }
                </Box>
                <Divider/>
                <Box my={2}>
                    <Grid container direction="row" justify="space-between" spacing={2}>
                        <Grid item xs={4} style={{width: "300px"}}>
                            <img src={this.state.user.ProfilePicture.url} alt="profile"
                                style={{
                                    border: '4px solid black', borderRadius: '12px',
                                    width: '100%', height: 'auto'
                                }}>
                            </img>
                        </Grid>
                        <Grid item xs={8} sm container direction="column" spacing={2}>
                            <Grid item>
                                <Typography>Upload profile picture</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" component="label">
                                    Choose File...
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant = "contained" onClick={this.handleRemoveProfilePic}>
                                    Remove Profile Picture
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Divider/>
                <Box my={2}>
                    {(this.state.editing) &&
                        (
                            <Typography variant="h4">Main Settings</Typography>
                        )
                    }
                    <Grid container direction="row" justify="left" spacing={2}>
                        <Grid item xs={12}>
                            {(this.state.editing)?
                                (
                                    <TextField
                                        name="Fullname"
                                        label="Full name"
                                        margin="dense"
                                        style={{ width: "100%" }}
                                        onChange={this.handleChange}
                                        value={this.state.user.Fullname}
                                    />
                                    
                                ):
                                (
                                    <div>
                                        <Typography>Name: </Typography>
                                        <Typography>{this.state.user.Fullname}</Typography>
                                    </div>
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {(this.state.editing)?
                                (
                                    <TextField
                                        name="email"
                                        label="Email"
                                        margin="dense"
                                        style={{ width: "100%" }}
                                        onChange={this.handleChange}
                                        value={this.state.user.email}
                                    />
                                    
                                ):
                                (
                                    <div>
                                        <Typography>Email: </Typography>
                                        <Typography>{this.state.user.email}</Typography>
                                    </div>
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {(this.state.editing)?
                                (
                                    <TextField
                                        name="phone"
                                        label="Phone"
                                        margin="dense"
                                        style={{ width: "100%" }}
                                    />
                                    
                                ):
                                (
                                    <div>
                                        <Typography>Phone: </Typography>
                                        <Typography>1234567890</Typography>
                                    </div>
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {(this.state.editing)?
                                (
                                    <TextField
                                        name="linkedin"
                                        label="LinkedIn"
                                        margin="dense"
                                        style={{ width: "100%" }}
                                    />
                                    
                                ):
                                (
                                    <div>
                                        <Typography>LinkedIn: </Typography>
                                        <Typography>
                                            <Link href="https://www.linkedin.com/in/jrt0799/">
                                                https://www.linkedin.com/in/jrt0799/
                                            </Link>
                                        </Typography>
                                    </div>
                                )
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Box my={2}>
                    {(this.state.editing)?
                        (
                            <Grid container direction="row" justify="space-between" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={this.handleSubmit}>
                                        Update Profile
                                    </Button>
                                </Grid>
                            </Grid>
                        ):
                        (   // TODO: Only the logged in user should be able to edit their profile
                            <Button variant="contained" onClick={this.handleEdit}>
                                Edit Profile
                            </Button>
                        )
                    }
                    
                </Box>
            </Box>
        );

        // TODO: add sponsor profile settings
    }
}

export default ViewProfile;