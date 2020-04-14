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
import PropTypes from 'prop-types';
import api from '../Services/api';
import MarkdownEditor from './Markdown/MarkdownEditor';
import PhotoUpload from './PhotoUpload';
import {imageURL} from '../utils/utils';

class DepartmentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: '',
      user: '',
      name: '',
      url: '',
      email: '',
      description: '',
      preview: '',
      coverPhoto: '',
      thumbnail: '',
      id: ''
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

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {name, email, url, description, phone, preview} = this.state;
    const {department} = this.props;

    await api.sponsors.update(department.id, {
      name,
      email,
      url,
      description,
      phone,
      preview
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleCreate = async () => {
    const {name, email, url, description, phone, preview, user} = this.state;

    await api.sponsors.create({
      name,
      email,
      url,
      description,
      phone,
      preview,
      personnel: [user]
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleMarkdownChange = (name, value) => {
    this.setState({[name]: value});
  };

  initFields() {
    const {department} = this.props;

    this.setState({
      name: department.name,
      email: department.email,
      description: department.description,
      url: department.url,
      phone: department.phone,
      preview: department.preview,
      id: department.id
    });
  }

  render() {
    const {open, type, name, email, url, description, phone, preview, coverPhoto, thumbnail, id} = this.state;
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
            <DialogContentText>
              Change any field or upload new photos. Click Save all changes have been made
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label='Department Name'
                  value={name}
                  fullWidth
                  onChange={this.handleChange('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Organization URL'
                  value={url}
                  fullwidth
                  onChange={this.handleChange('url')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Department Phone Number'
                  value={phone}
                  onChange={this.handleChange('phone')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Department Email'
                  value={email}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption'>Enter Department Description and Information below</Typography>
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
            </Grid>
            <PhotoUpload
              fieldName='coverPhoto'
              contentType='departments'
              title='Choose Cover Photo'
              id={id}
              photo={imageURL.department(coverPhoto)}
            />
            <PhotoUpload
              fieldName='thumbnail'
              contentType='departments'
              title='Choose Thumbnail'
              id={id}
              photo={imageURL.department(thumbnail)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            {type === 'edit' &&
              <Button onClick={this.handleSave} color='primary'>
                Save
              </Button>}
            {type === 'create' &&
              <Button onClick={this.handleCreate} color='primary'>
                Create
              </Button>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DepartmentForm.propTypes = {
  type: PropTypes.string.isRequired,
  department: PropTypes.isRequired,
  title: PropTypes.string.isRequired
};

export default compose(
)(DepartmentForm);
