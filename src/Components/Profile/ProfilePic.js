import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {formatEntryUpload, imageURL} from '../../utils/utils';
import api from '../../Services/api';

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  handleSelectImage = event => {
    this.setState({selectedFile : event.target.files[0]});
  }

  handleUploadImage = async () => {
    const {selectedFile} = this.state;
    const {user, username, picture, message} = this.props;

    try{
      // Upload the new picture
      const fileUpload = formatEntryUpload(selectedFile, 'user', user.id, 'picture', 'users-permissions');
      await api.uploads.upload(fileUpload);
      this.setState({selectedFile: null});
    } catch(err){
      const msg = 'The server responded with a status of '.concat(err.data.statusCode).concat(' (').concat(err.data.message).concat(')');
      message(msg);
    }

    try{
      // Update the screen
      const response = await api.users.find({username});
      const pic = response[0].picture;
      picture(pic);
    } catch(err){
      const msg = 'Upload success, but could not display image.';
      message(msg);
    }
  }

  handleRemoveProfilePic = async () => {
    const {user, picture, message} = this.props;
    if (user.picture) {
      try{
        await api.uploads.delete(user.picture.id);
        picture(null);
      } catch(err){
        const msg = 'The server responded with a status of '.concat(err.data.statusCode).concat(' (').concat(err.data.message).concat(')');
        message(msg);
      }
    }
  };

  render() {
    const {user, canEdit} = this.props;
    const {selectedFile} = this.state;

    return (
      <Box my={2}>
        <Grid container direction='row' justify='space-between' spacing={2}>
          <Grid item xs={4}>
            <img
              src={imageURL.user(user.picture)} alt='profile'
              style={{
                border: '4px solid black', borderRadius: '12px',
                width: '100%', height: 'auto'
              }}
            />
          </Grid>
          {canEdit &&
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
                      style={{display: 'none'}}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  {selectedFile &&
                    <Button variant='contained' component='label' onClick={this.handleUploadImage}>
                      Upload Image
                    </Button>
                  }
                </Grid>
              </Grid>
              {selectedFile &&
                <Grid item>
                  <Typography>{selectedFile && selectedFile.name}</Typography>
                </Grid>
              }
              <Grid item>
                {user.picture ?
                  <Button variant='contained' onClick={this.handleRemoveProfilePic}>
                    Remove Profile Picture
                  </Button> :
                  <Button variant='contained' disabled>Remove Profile Picture</Button>
                }
              </Grid>
            </Grid>
          }
        </Grid>
      </Box>
    );
  }
}

ProfilePic.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.func.isRequired,
  message: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default ProfilePic;
