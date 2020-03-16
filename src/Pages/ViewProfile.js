import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import _ from 'lodash';
import {strapi, strapiURL} from '../constants';
import defaultProfilePicture from '../Static/default-user-profile-image-png-6.png';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: true,
      user: {
        _id: '',
        username: '',
        email: '',
        Fullname: '',
        ProfilePicture: ''
      },
    };
  }

  async componentDidMount() {
    const {match} = this.props;

    // Get the data for the user in question
    const response = await strapi.axios.get(`${strapiURL}/users`,
      {
        params: {
          username: match.params.username
        }
      });

    // Check to see if the user has a profile picture. If not, load the default one
    let picture = defaultProfilePicture;
    if (!_.isEmpty(response.data[0]) && response.data[0].ProfilePicture) {
      picture = strapiURL + response.data[0].ProfilePicture.url;
    }
    const {user} = this.state;
    this.setState({user: {...user, ProfilePicture: picture}, editing: false});
  }

  handleCancel = () => {
    this.setState({editing: false});
  };

  handleChange = event => {
    const {user} = this.state;
    const {target} = event;
    const {value} = target;
    const {name} = target;
    this.setState({user: {...user, [name]: value}});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleRemoveProfilePic = async () => {
    const {user} = this.state;
    await strapi.axios.delete(`${strapiURL}/upload/files/${user.ProfilePicture._id}`);
  };

  handleSubmit = event => {
    // todo: add authentication
    const {user} = this.state;
    strapi.axios.put(`${strapiURL}/users/${user._id}`, user); // must enable users-permissions: update
    this.setState({editing: false});
    event.preventDefault();
  };

  render() {
    const {editing, user} = this.state;

    return (
      <Box width='50%' mx='auto'>
        <Box my={2}>
          {(editing)?
            (
              <Typography variant='h3'>Profile Settings</Typography>
            ):
            (
              <Typography variant='h3'>Profile: {user.Fullname}</Typography>
            )
          }
        </Box>
        <Divider/>
        <Box my={2}>
          <Grid container direction='row' justify='space-between' spacing={2}>
            <Grid item xs={4} style={{width: '300px'}}>
              <img
                src={user.ProfilePicture} alt='profile'
                style={{
                  border: '4px solid black', borderRadius: '12px',
                  width: '100%', height: 'auto'
                }}
              />
            </Grid>
            <Grid item xs={8} sm container direction='column' spacing={2}>
              <Grid item>
                <Typography>Upload profile picture</Typography>
              </Grid>
              <Grid item>
                <Button variant='contained' component='label'>
                  Choose File...
                  <input
                    type='file'
                    style={{display: 'none'}}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button variant = 'contained' onClick={this.handleRemoveProfilePic}>
                  Remove Profile Picture
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider/>
        <Box my={2}>
          {(editing) &&
                        (
                          <Typography variant='h4'>Main Settings</Typography>
                        )
          }
          <Grid container direction='row' justify='left' spacing={2}>
            <Grid item xs={12}>
              {(editing)?
                (
                  <TextField
                    name='Fullname'
                    label='Full name'
                    margin='dense'
                    style={{width: '100%'}}
                    onChange={this.handleChange}
                    value={user.Fullname}
                  />

                ):
                (
                  <div>
                    <Typography>Name: </Typography>
                    <Typography>{user.Fullname}</Typography>
                  </div>
                )
              }
            </Grid>
            <Grid item xs={12}>
              {(editing)?
                (
                  <TextField
                    name='email'
                    label='Email'
                    margin='dense'
                    style={{width: '100%'}}
                    onChange={this.handleChange}
                    value={user.email}
                  />

                ):
                (
                  <div>
                    <Typography>Email: </Typography>
                    <Typography>{user.email}</Typography>
                  </div>
                )
              }
            </Grid>
            <Grid item xs={12}>
              {(editing)?
                (
                  <TextField
                    name='phone'
                    label='Phone'
                    margin='dense'
                    style={{width: '100%'}}
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
              {(editing)?
                (
                  <TextField
                    name='linkedin'
                    label='LinkedIn'
                    margin='dense'
                    style={{width: '100%'}}
                  />

                ):
                (
                  <div>
                    <Typography>LinkedIn: </Typography>
                    <Typography>
                      <Link href='https://www.linkedin.com/in/jrt0799/'>
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
          {(editing)?
            (
              <Grid container direction='row' justify='space-between' spacing={2}>
                <Grid item>
                  <Button variant='contained' onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' onClick={this.handleSubmit}>
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            ):
            (   // TODO: Only the logged in user should be able to edit their profile
              <Button variant='contained' onClick={this.handleEdit}>
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
