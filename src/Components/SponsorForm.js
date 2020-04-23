import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';
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
      cover: '',
      logo: '',
      thumbnail: '',
      selectedCover: null,
      selectedLogo: null,
      selectedThumbnail: null
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
      cover: sponsor.cover,
      logo: sponsor.logo,
      thumbnail: sponsor.thumbnail
    });
  };

  uploadImages = async () => {
    const {selectedCover, selectedLogo, selectedThumbnail, id} = this.state;
    const {enqueueSnackbar} = this.props;

    try{
      if (selectedCover) {
        const fileUpload = formatEntryUpload(selectedCover, 'sponsors', id, 'cover');
        await api.uploads.upload(fileUpload);
      }
      if (selectedLogo) {
        const fileUpload = formatEntryUpload(selectedLogo, 'sponsors', id, 'logo');
        await api.uploads.upload(fileUpload);
      }
      if (selectedThumbnail) {
        const fileUpload = formatEntryUpload(selectedThumbnail, 'sponsors', id, 'thumbnail');
        await api.uploads.upload(fileUpload);
      }
      enqueueSnackbar('Your changes have been saved.', snack.success);
    } catch(err){
      enqueueSnackbar('Error uploading the organizations photos', snack.error);
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

    await this.uploadImages();
    this.setState({open: false});
    update();
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

      enqueueSnackbar('New sponsor was successfully created.', snack.success);
      await this.uploadImages();
      this.setState({id: newSponsor.data.id});
    } catch (err) {
      enqueueSnackbar('There was a problem creating a new sponsor');
    }

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
    const {open, type, id, name, url, description, preview, cover, logo, thumbnail} = this.state;
    const {title} = this.props;

    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
          <DialogContent>
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
                  fieldName='selectedCover'
                  contentType='sponsors'
                  title='Choose Cover Photos'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(cover)}
                />
                <PhotoUpload
                  fieldName='selectedLogo'
                  contentType='sponsors'
                  title='Choose Organization Logo'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(logo)}
                />
                <PhotoUpload
                  fieldName='selectedThumbnail'
                  title='Choose Thumbnail'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(thumbnail)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            {type === 'edit' &&
              <Button onClick={this.handleSave} color='primary'>
                Save
              </Button>
            }
            {type === 'create' &&
              <Button onClick={this.handleCreate} color='primary'>
                Create
              </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SponsorForm.defaultProps = {
  sponsor: null
};

SponsorForm.propTypes = {
  type: PropTypes.string.isRequired,
  sponsor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
    cover: PropTypes.isRequired,
    thumbnail: PropTypes.isRequired,
    logo: PropTypes.isRequired
  }),
  title: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

SponsorForm.contextType = AuthContext;

export default withSnackbar(compose()(SponsorForm));
