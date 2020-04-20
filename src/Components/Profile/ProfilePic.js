import {withSnackbar} from 'notistack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {formatEntryUpload, imageURL} from '../../utils/utils';
import api from '../../Services/api';
import {permissions} from '../../constants';
import Can from '../Can';
import {snack} from '../../utils/Snackbar';

const styles = () => ({
  picBorder:{
    border: '4px solid black', borderRadius: '12px',
    width: '100%', height: 'auto'
  }
});

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
    const {user, username, picture, enqueueSnackbar} = this.props;

    try{
      // Upload the new picture
      const fileUpload = formatEntryUpload(selectedFile, 'user', user.id, 'picture', 'users-permissions');
      await api.uploads.upload(fileUpload);
      this.setState({selectedFile: null});
      enqueueSnackbar('Your changes have been saved.', snack.success);
    } catch(err){
      const msg = 'The server responded with a status of '.concat(err.data.statusCode).concat(' (').concat(err.data.message).concat(')');
      enqueueSnackbar(msg, snack.error);
    }

    try{
      // Update the screen
      const response = await api.users.find({username});
      const pic = response[0].picture;
      picture(pic);
    } catch(err){
      const msg = 'Upload success, but could not display image.';
      enqueueSnackbar(msg, snack.error);
    }
  }

  handleRemoveProfilePic = async () => {
    const {user, picture, enqueueSnackbar} = this.props;
    if (user.picture) {
      try{
        await api.uploads.delete(user.picture.id);
        picture(null);
        enqueueSnackbar('Profile picture removed.', snack.success);
      } catch(err){
        const msg = 'The server responded with a status of '.concat(err.data.statusCode).concat(' (').concat(err.data.message).concat(')');
        enqueueSnackbar(msg, snack.error);
      }
    }
  };

  render() {
    const {user, canEdit, classes} = this.props;
    const {selectedFile} = this.state;

    return (
      <Box my={2}>
        <Grid container direction='row' justify='space-between' spacing={2}>
          <Grid item xs={4}>
            <img
              src={imageURL.user(user.picture)} alt='profile'
              className={classes.picBorder}
            />
          </Grid>
          <Can perform={permissions.users_permissions.user.update}>
            <>
              {canEdit &&
                <Grid item xs={8} sm container direction='column' spacing={2}>
                  <Can perform={permissions.upload.upload.upload}>
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
                  </Can>
                  <Can perform={permissions.upload.upload.destroy}>
                    <Grid item>
                      {user.picture ?
                        <Button variant='contained' onClick={this.handleRemoveProfilePic}>
                          Remove Profile Picture
                        </Button> :
                        <Button variant='contained' disabled>Remove Profile Picture</Button>
                      }
                    </Grid>
                  </Can>
                </Grid>
              }
            </>
          </Can>
        </Grid>
      </Box>
    );
  }
}

ProfilePic.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(styles)(ProfilePic));
