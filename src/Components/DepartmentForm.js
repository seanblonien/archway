import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        cover: '',
        id: '',
        professors: [],
      },
      allUsers: [],
      selectedThumbnail: '',
      selectedCover: ''
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

  handleDialogToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  handleSave = async () => {
    const {department} = this.state;
    const {enqueueSnackbar, update} = this.props;

    try {
      await api.departments.update(department.id, department);
      await this.uploadImages(department.id);
      enqueueSnackbar('The department was updated.', snack.success);
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
      const newDepartment = await api.departments.create({
        name: department.name,
        email: department.email,
        phone: department.phone,
        url: department.url,
        description: department.description,
        preview: department.preview
      });

      enqueueSnackbar('The department was successfully created.', snack.success);
      await this.uploadImages(newDepartment.data.id);

    } catch (err) {
      enqueueSnackbar('There was a problem creating the department.', snack.error);
    }

    this.setState({open: false});
    update();
  };

  uploadImages = async (id) => {
    const {selectedThumbnail, selectedCover} = this.state;
    const {enqueueSnackbar} = this.props;
    let fileUpload;

    try{
      if (selectedThumbnail !== '') {
        fileUpload = formatEntryUpload(selectedThumbnail, 'departments', id, 'thumbnail', 'users-permissions');
        await api.uploads.upload(fileUpload);
      }
      if (selectedCover !== '') {
        fileUpload = formatEntryUpload(selectedCover, 'departments', id, 'cover', 'users-permissions');
        await api.uploads.upload(fileUpload);
      }
      enqueueSnackbar('Any photos have been saved.', snack.success);
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
    this.setState({[name]: value});
  };

  setProfessors = (professors) => {
    this.setState(prevState => ({department: {
      ...prevState.department,
      professors}
    }));
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
      cover: department.cover,
      professors: department.professors
    }});
  }

  render() {
    const {open, type, allUsers, department} = this.state;
    const {name, email, url, description, phone, preview, professors, thumbnail, cover} = department;
    const {title} = this.props;
    const {handleDialogToggle, handleSave, handleCreate, handleChange,
      handleMarkdownChange, setProfessors, handleFileChange} = this;

    return (
      <div>
        <Button variant='contained' color='secondary' onClick={handleDialogToggle}>
          {title}
        </Button>
        <Dialog
          open={open}
          onClose={handleDialogToggle}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <ValidatorForm onSubmit={handleDialogToggle}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label='Department Name'
                    name='name'
                    value={name || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Department URL'
                    name='url'
                    value={url || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Phone Number'
                    name='phone'
                    value={phone || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    label='Contact Email'
                    name='email'
                    value={email || ''}
                    fullWidth
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>Enter department description and other information below</Typography>
                  <MarkdownEditor
                    uniqueName='description'
                    setValue={(value) => handleMarkdownChange('description', value)}
                    value={description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <PeopleSelect
                    title='Select Department Professors and Faculty'
                    users={allUsers}
                    selectedUsers={professors}
                    setSelectedUsers={setProfessors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhotoUpload
                    fieldName='selectedThumbnail'
                    title='Choose Thumbnail'
                    onChange={handleFileChange}
                    photo={imageURL.department(thumbnail)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhotoUpload
                    fieldName='selectedCover'
                    title='Choose Cover Photos'
                    onChange={handleFileChange}
                    photo={imageURL.department(cover)}
                  />
                </Grid>

              </Grid>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogToggle} color='primary'>
              Cancel
            </Button>
            {type === 'edit' &&
              <Button onClick={handleSave} color='primary'>
                Save
              </Button>}
            {type === 'create' &&
              <Button onClick={handleCreate} color='primary'>
                Create
              </Button>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DepartmentForm.defaultProps = {
  department: null
};

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
    cover: PropTypes.isRequired,
    thumbnail: PropTypes.isRequired,
    professors: PropTypes.isRequired
  }),
  title: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

DepartmentForm.contextType = AuthContext;

export default withSnackbar(DepartmentForm);
