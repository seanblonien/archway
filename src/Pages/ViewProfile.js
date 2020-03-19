import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {imageURL} from '../utils/utils';
import api from '../Services/api';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
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
    const response = await api.users.find({username: match.params.username});
    const user = response[0];

    // Get the user's profile picture
    this.setState({user});
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
    if(user.ProfilePicture) {
      await api.uploads.delete(user.ProfilePicture.id);
    }
  };

  handleSubmit = async (event) => {
    // todo: add authentication
    const {user} = this.state;
    await api.users.update(user.id, user);
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
                src={imageURL.user(user.ProfilePicture)} alt='profile'
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
