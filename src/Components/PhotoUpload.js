import {withSnackbar} from 'notistack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {permissions} from '../constants';
import Can from './Can';

const styles = () => ({
  picBorder:{
    border: '4px solid black', borderRadius: '12px',
    width: '100%', height: 'auto'
  }
});

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    const {photo} = this.props;

    this.state = {
      selectedFile: null,
      photo
    };
  }

  handleSelectImage = event => {
    const {onChange, fieldName} = this.props;
    this.setState({selectedFile : event.target.files[0]});
    onChange(fieldName, event.target.files[0]);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        photo: [reader.result],
      });
    };
  };

  render() {
    const {classes, title} = this.props;
    const {selectedFile, photo} = this.state;

    return (
      <Box my={2}>
        <Grid container direction='row' justify='space-between' spacing={2}>
          <Grid item xs={4}>
            <img
              src={photo}
              alt='selected'
              className={classes.picBorder}
            />
          </Grid>
          <Grid item xs={8} sm container direction='column' spacing={2}>
            <Can perform={permissions.upload.upload.upload}>
              <Grid item>
                <Typography>{title}</Typography>
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
              </Grid>
              {selectedFile &&
                <Grid item>
                  <Typography>{selectedFile && selectedFile.name}</Typography>
                </Grid>
              }
            </Can>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

PhotoUpload.propTypes = {
  photo: PropTypes.node.isRequired,
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default compose(
  withSnackbar,
  withStyles(styles)
)(PhotoUpload);
