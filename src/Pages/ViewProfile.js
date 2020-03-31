import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Markdown from 'markdown-to-jsx';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import {formatEntryUpload, imageURL} from '../utils/utils';
import api from '../Services/api';
import { permissions } from '../constants';
import Can from '../Components/Can';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      user: {
        id: '',
        username: '',
        email: '',
        Fullname: '',
        picture: '',
        sponsorOrganization: '',
        role: '',
        description: '',
      },
      unchangedUser: {
        id: '',
        username: '',
        email: '',
        Fullname: '',
        picture: '',
        sponsorOrganization: '',
        role: '',
        description: '',
      },
      sponsors: [],
      selectedFile: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    // Get the data for the user in question
    const response = await api.users.find({ username: match.params.username });
    const user = response[0];
    const unchangedUser = response[0];

    // Get the user's profile picture
    this.setState({ user });
    this.setState({ unchangedUser });

    // Get the list of sponsors
    const sponsors = await api.sponsors.find({});
    this.setState({ sponsors });
  }

  handleCancel = () => {
    const {unchangedUser} = this.state;
    this.setState({ editing: false });
    this.setState({ user: unchangedUser});
  };

  handleChange = event => {
    const { user } = this.state;
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({ user: { ...user, [name]: value } });
  };

  handleSelectImage = event => {
    this.setState({ selectedFile : event.target.files[0] });
  }

  handleUploadImage = async () => {
    const { user, selectedFile } = this.state;
    try{
      const fileUpload = formatEntryUpload(selectedFile, 'user', user.id, 'picture', 'users-permissions');
      await api.uploads.upload(fileUpload);
    } catch(e){
      console.log(e);
    }
    // TODO if successful, close the 'choose file' form, update URL without refreshing
    // TODO if error, render some sort of message saying the error
  }

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleRemoveProfilePic = async () => {
    const { user } = this.state;
    if (user.picture) {
      await api.uploads.delete(user.picture.id);
    }
  };

  handleSubmit = async (event) => {
    // todo: add authentication
    const { user } = this.state;
    await api.users.update(user.id, user);
    this.setState({ editing: false });
    this.setState({ unchangedUser: user });
    event.preventDefault();
  };

  render() {
    const { editing, user, sponsors, selectedFile } = this.state;

    return (
      <Box width='50%' mx='auto'>
        <Box mt={2}>
          <Grid container direction='row' justify='space-between' alignItems='flex-end' spacing={2}>
            <Grid item xs={10}>
              {(editing) ?
                (
                  <Typography variant='h3' align='left'>Profile Settings</Typography>
                ) :
                (
                  <Typography variant='h3' align='left'>Profile: {user.Fullname}</Typography>
                )
              }
            </Grid>
            <Grid item xs={2}>
              <Typography align='right'>{user.role.name}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box my={2}>
          <Grid container direction='row' justify='space-between' spacing={2}>
            <Grid item xs={4} style={{ width: '300px' }}>
              <img
                src={imageURL.user(user.picture)} alt='profile'
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
              <Grid item container direction='row' spacing={2}>
                <Grid item>
                  <Button variant='contained' component='label'>
                    Choose File...
                    <input
                      type='file'
                      name='file'
                      onChange={this.handleSelectImage}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  {selectedFile &&
                    <div>
                      <Typography>{selectedFile && selectedFile.name}</Typography>
                      <Button variant='contained' component='label' onClick={this.handleUploadImage}>
                        Upload Image
                      </Button>
                    </div>
                  }
                </Grid>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={this.handleRemoveProfilePic}>
                  Remove Profile Picture
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box my={2}>
          {(editing) &&
            (
              <Typography variant='h4'>Main Settings</Typography>
            )
          }
          <Grid container direction='row' justify='left' spacing={2}>
            <Grid item xs={12}>
              {(editing) ?
                (
                  <TextField
                    name='Fullname'
                    label='Full name'
                    margin='dense'
                    style={{ width: '100%' }}
                    onChange={this.handleChange}
                    value={user.Fullname}
                  />
                ) :
                (
                  <div>
                    <Typography>Name: </Typography>
                    <Typography>{user.Fullname}</Typography>
                  </div>
                )
              }
            </Grid>
            <Grid item xs={12}>
              {(editing) ?
                (
                  <TextField
                    name='email'
                    label='Email'
                    margin='dense'
                    style={{ width: '100%' }}
                    onChange={this.handleChange}
                    value={user.email}
                  />
                ) :
                (
                  <div>
                    <Typography>Email: </Typography>
                    <Typography>{user.email}</Typography>
                  </div>
                )
              }
            </Grid>
            <Grid item xs={12}>
              {(editing) ?
                (
                  <TextField
                    name='description'
                    label='Bio'
                    margin='dense'
                    style={{ width: '100%' }}
                    multiline
                    onChange={this.handleChange}
                    value={user.description}
                  />
                ) :
                (
                  <div>
                    <Typography style={{padding: '0px 0px 12px 0px'}}>Bio: </Typography>
                    <Box border={1} borderRadius={12} padding={2}>
                      <Markdown>{user.description? user.description : ''}</Markdown>
                    </Box>
                  </div>
                )
              }
            </Grid>
          </Grid>
        </Box>
        <Can perform={permissions.application.proposals.create} role={user.role.name}>
          <div>
            <Divider />
            <Box my={2}>
              {(editing) &&
                (
                  <Typography variant='h4'>Sponsor Settings</Typography>
                )
              }
              <Grid container direction='row' justify='left' spacing={2}>
                <Grid item xs={12}>
                  {(editing) ?
                    (
                      <div>
                        <InputLabel id='sponsor-organization-select-label'>Organization</InputLabel>
                        <Select
                          name='sponsorOrganization'
                          labelId='sponsor-organization-select-label'
                          margin='dense'
                          style={{ width: '100%' }}
                          onChange={this.handleChange}
                          value={user.sponsorOrganization}
                        >
                          {sponsors.map(sponsor => (
                            <option key={sponsor.id} value={sponsor}>
                              {sponsor.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ) :
                    (
                      <div>
                        <Typography>Organization: </Typography>
                        <Typography>{user.sponsorOrganization && user.sponsorOrganization.name}</Typography>
                      </div>
                    )
                  }
                </Grid>
              </Grid>
            </Box>
          </div>
        </Can>

        <Box my={2}>
          {(editing) ?
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
            ) :
            (   // TODO: Only the logged in user should be able to edit their profile
              <Button variant='contained' onClick={this.handleEdit}>
                Edit Profile
              </Button>
            )
          }
        </Box>
      </Box>
    );
  }
}

export default ViewProfile;
