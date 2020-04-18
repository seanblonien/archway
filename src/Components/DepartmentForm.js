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
import PropTypes from 'prop-types';
import {withSnackbar} from 'notistack';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import api from '../Services/api';
import MarkdownEditor from './Markdown/MarkdownEditor';
import PhotoUpload from './PhotoUpload';
import {formatEntryUpload, imageURL} from '../utils/utils';
import {snack} from '../utils/Snackbar';
import AuthContext from '../Contexts/AuthContext';
import PeopleSelect from './PeopleSelect';

class DepartmentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: '',
      department: {
        name: '',
        url: '',
        email: '',
        description: '',
        preview: '',
        thumbnail: '',
        id: '',
        professors: [],
      },
      allUsers: [],
      selectedThumbnail: ''
    };
  }

  componentDidMount = async () => {
    const {type} = this.props;
    this.setState({type});
    if (type === 'edit') {
      this.initFields();
    }

    const allUsers = await api.users.find();
    this.setState({allUsers});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {department} = this.state;
    const {enqueueSnackbar, update} = this.props;

    try {
      await api.departments.update(department.id, department);

      enqueueSnackbar('The department was updated.', snack.success);
      await this.uploadImages();
    } catch (err) {
      enqueueSnackbar('The department was unable to update.', snack.error);
    }

    update();
    this.setState({open: false});
  };

  handleCreate = async () => {
    const {department} = this.state;
    const {update, enqueueSnackbar} = this.props;

    try {
      await api.departments.create(department);

      enqueueSnackbar('The department was successfully created.', snack.success);
      await this.uploadImages();

    } catch (err) {
      enqueueSnackbar('There was a problem creating the department.', snack.error);
    }

    this.setState({open: false});
    update();
  };

  uploadImages = async () => {
    const {selectedThumbnail, id} = this.state;
    const {enqueueSnackbar} = this.props;
    let fileUpload;

    try{
      if (selectedThumbnail !== '') {
        fileUpload = formatEntryUpload(selectedThumbnail, 'departments', id, 'thumbnail', 'users-permissions');
        await api.uploads.upload(fileUpload);
      }
      enqueueSnackbar('Your thumbnail has been saved.', snack.success);
    } catch(err){
      const msg = 'There was a problem uploading the department photos.';
      enqueueSnackbar(msg, snack.error);
    }
  };


  handleChange = (event) => {
    const {department} = this.state;
    const {value, name} = event.target;

    this.setState({department: {
      ...department,
      [name]: value}
    });
  };

  handleMarkdownChange = (name, value) => {
    const {department} = this.state;
    this.setState({department: {
      ...department,
      [name]: value}
    });
  };

  handleFileChange = (name, value) => {
    const {department} = this.state;
    this.setState({department: {
      ...department,
      [name]: value}
    });
  };

  handleProfessorSelect = (user) => {
    const {professors} = this.state;
    professors.push(user);
    this.setState({professors});
  };

  handleProfessorRemove = (user) => {
    const {professors} = this.state;

    const index = professors.indexOf(user);
    if (index !== -1) professors.splice(index, 1);

    this.setState({professors});
  };

  initFields() {
    const {department} = this.props;

    this.setState({department: {
      ...department,
      name: department.name,
      email: department.email,
      description: department.description,
      url: department.url,
      phone: department.phone,
      preview: department.preview,
      id: department.id,
      thumbnail: department.thumbnail,
      professors: department.professors
    }});
  }

  render() {
    const {open, type, id, allUsers, department} = this.state;
    const {name, email, url, description, phone, preview, professors, thumbnail} = department;
    const {title} = this.props;

    return (
      <div>
        <Button variant='contained' color='secondary' onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <ValidatorForm
              onSubmit={this.handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label='Department Name'
                    name='name'
                    value={name}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Department URL'
                    name='url'
                    value={url}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Phone Number'
                    name='phone'
                    value={phone}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    label='Contact Email'
                    name='email'
                    value={email}
                    fullWidth
                    onChange={this.handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={['An email is required.', 'The email is invalid.']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows='2'
                    fullWidth
                    name='preview'
                    label='Preview'
                    value={preview}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>Enter department description and other information below</Typography>
                  <MarkdownEditor
                    uniqueName='description'
                    setValue={(value) => this.handleMarkdownChange('description', value)}
                    value={description}
                  />
                </Grid>

                <PeopleSelect
                  title='Select Department Professors and Faculty'
                  allUsers={allUsers}
                  selectedPeople={professors}
                  handleConfirmUser={this.handleProfessorSelect}
                  handleRemove={this.handleProfessorRemove}
                />
                <PhotoUpload
                  fieldName='selectedThumbnail'
                  title='Choose Thumbnail'
                  id={id}
                  onChange={this.handleFileChange}
                  photo={imageURL.sponsor(thumbnail)}
                />
              </Grid>
            </ValidatorForm>
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
  department: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
    thumbnail: PropTypes.isRequired,
    professors: PropTypes.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

DepartmentForm.contextType = AuthContext;

export default withSnackbar(compose(
)(DepartmentForm));
