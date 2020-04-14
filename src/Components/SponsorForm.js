import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withSnackbar} from 'notistack';
import api from '../Services/api';
import MarkdownEditor from './Markdown/MarkdownEditor';
import {formatEntryUpload, imageURL} from '../utils/utils';
import {snack} from '../utils/Snackbar';
import AuthContext from '../Contexts/AuthContext';
import PhotoUpload from './PhotoUpload';

class SponsorForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: '',
      user: '',
      id: '',
      name: '',
      url: '',
      description: '',
      preview: '',
      coverPhoto: '',
      logo: '',
      thumbnail: '',
      selectedCover: '',
      selectedLogo: '',
      selectedThumbnail: ''
    };
  }

  componentDidMount() {
    const {type} = this.props;
    const {user} = this.context;
    this.setState({type, user});
    if (type === 'edit') {
      this.initFields();
    }
  }

  initFields = () => {
    const {sponsor} = this.props;

    this.setState({
      name: sponsor.name,
      id: sponsor.id,
      description: sponsor.description,
      url: sponsor.url,
      preview: sponsor.preview,
      coverPhoto: sponsor.coverPhoto,
      logo: sponsor.logo,
      thumbnail: sponsor.thumbnail
    });
  };

  uploadImages = async () => {
    const {selectedCover, selectedLogo, selectedThumbnail, id} = this.state;
    const {enqueueSnackbar} = this.props;

    let fileUpload;

    try{
      // Upload the new picture
      if (selectedCover !== '') {
        fileUpload = formatEntryUpload(selectedCover, 'sponsors', id, 'coverPhoto', 'users-permissions');
        await api.uploads.upload(fileUpload);
      }
      if (fileUpload !== '') {
        fileUpload = formatEntryUpload(selectedLogo, 'sponsors', id, 'logo', 'users-permissions');
        await api.uploads.upload(fileUpload)
      }
      if (selectedThumbnail !== '') {
        fileUpload = formatEntryUpload(selectedThumbnail, 'sponsors', id, 'thumbnail', 'users-permissions');
        await api.uploads.upload(fileUpload);
      }

      enqueueSnackbar('Your changes have been saved.', snack.success);
    } catch(err){
      const msg = 'there was a problem uploading the organizations photos';
      enqueueSnackbar(msg, snack.error);
    }
  };

  handleSave = async () => {
    const {name, url, description, preview} = this.state;
    const {sponsor, update} = this.props;

    await api.sponsors.update(sponsor.id, {
      name,
      url,
      description,
      preview
    });

    this.uploadImages();

    update();
    this.setState({open: false});
  };

  handleCreate = async () => {
    const {name, url, description, preview, user} = this.state;
    const {enqueueSnackbar, update} = this.props;

    try {
      const newSponsor = await api.sponsors.create({
        name,
        url,
        description,
        preview,
        personnel: [user]
      });

      this.setState({id: newSponsor.id});

    } catch (err) {

    }

    this.uploadImages();

    update();
    this.setState({open: false});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleFileChange = (name, value) => {
    this.setState({[name] : value});
  };

  handleMarkdownChange = (name, value) => {
    this.setState({[name]: value});
  };

  render() {
    const {open, type, id, name, url, description, preview, coverPhoto, logo, thumbnail, user} = this.state;
    const {title, sponsor} = this.props;

    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog open={open} onClose={this.handleClose}
                aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Change any field or upload new photos. Click Save all changes have been made
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Organization Name'
                  value={name}
                  onChange={this.handleChange('name')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Organization URL'
                  value={url}
                  onChange={this.handleChange('url')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption'>Enter Organization Description and Information below</Typography>
                <MarkdownEditor
                  uniqueName='description'
                  setValue={(value) => this.handleMarkdownChange('description', value)}
                  value={description}
                />
                <TextField
                  multiline
                  rows='2'
                  fullWidth
                  label='Preview'
                  value={preview}
                  onChange={this.handleChange('preview')}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <PhotoUpload
                  fieldName='selectedPhoto'
                  contentType='sponsors'
                  title='Choose Cover Photo'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(coverPhoto)}>
                </PhotoUpload>
                <PhotoUpload
                  fieldName='selectedLogo'
                  contentType='sponsors'
                  title='Choose Organization Logo'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(logo)}
                >
                </PhotoUpload>
                <PhotoUpload
                  fieldName='selectedThumbnail'
                  title='Choose Thumbnail'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(thumbnail)}
                >
                </PhotoUpload>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            {type === 'edit' &&
            < Button onClick={this.handleSave} color='primary'>
              Save
              </Button>
            }
            {type === 'create' &&
            < Button onClick={this.handleCreate} color='primary'>
              Create
            </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SponsorForm.propTypes = {
  type: PropTypes.string.isRequired,
  sponsor: PropTypes.isRequired,
  enqueueSnackbar: PropTypes.isRequired,
  update: PropTypes.isRequired
};

SponsorForm.contextType = AuthContext;

export default withSnackbar(compose(
)(SponsorForm));
