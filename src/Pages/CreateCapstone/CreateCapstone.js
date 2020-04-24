import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import Filter from 'bad-words';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {withSnackbar} from 'notistack';
import _ from 'lodash';
import {ValidatorForm} from 'react-material-ui-form-validator';
import api from '../../Services/api';
import BasicInformation from './BasicInformation';
import StorageManager from '../../Contexts/StorageManager';
import MemberInformation from './MemberInformation';
import SponsorAndMediaInformation from './SponsorAndMediaInformation';
import {formatEntryUpload} from '../../utils/utils';
import {snack} from '../../utils/Snackbar';


const styles = theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '300px',

  },
  card: {
    marginTop: '1%',
  },
  leftColCard: {
    marginRight: '2%',
    marginTop: '1%',
  },
  formMargin: {
    marginTop: '.5%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 250,
    placeholder: 'Search...'
  },
});

class CreateCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      name: '',
      preview: '',
      isFeatured: false,
      startDate: new Date(),
      endDate: new Date(),
      deletedThumbnail: [],
      deletedCoverPhoto: [],
      deletedMedia: [],
      cover: [],
      thumbnail: [],
      media: [],
      departments: [],
      Username: StorageManager.getItem('user')._id,
      capstones: [],
      departmentList: [],
      sponsorList: [],
      checkedSponsors: [],
      selectedSponsor: '',
      AllUsers: [],
      Users: [],
      members: [],
      selectedProfessor: '',
      selectedTA: '',
      selectedUser: '',
      course: '',
      capstoneId: '',
      removeImg: false,
      semester: ''
    };
  }

  handleDescription = content => {
    this.setState({'description': content});
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  deletedThumbnail = deletedFileId => {
    const {deletedThumbnail} = this.state;
    if (deletedFileId !== '') {
      if (!deletedThumbnail.includes(deletedFileId)) {
        const joined = deletedThumbnail.concat(deletedFileId);
        this.setState({deletedThumbnail: joined});
      }
    }
  };

  deletedCover = deletedFileId => {
    const {deletedCover} = this.state;
    if (deletedFileId !== '') {
      if (!deletedCover.includes(deletedFileId)) {
        const joined = deletedCover.concat(deletedFileId);
        this.setState({deletedCover: joined});
      }
    }
  };

  deletedMedia = deletedFileId => {
    const {deletedMedia} = this.state;
    if (deletedFileId !== '') {
      if (!deletedMedia.includes(deletedFileId)) {
        const joined = deletedMedia.concat(deletedFileId);
        this.setState({deletedMedia: joined});
      }
    }
  };

  handleChangeSwitch = name => (event) => {
    this.setState({[name]: event.target.checked});
  };

  async componentDidMount() {

    ValidatorForm.addValidationRule('isProfane', value => {
      const filter = new Filter();
      if (filter.isProfane(value)) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('haveMembers', value => {
      const {members} = this.state;
      if (members.length > 0) {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('haveProfessor', value => {
      const {selectedProfessor} = this.state;
      if (selectedProfessor !== '') {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('haveTA', value => {
      const {selectedTA} = this.state;
      if (selectedTA !== '') {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('haveDepartment', value => {
      const {departments} = this.state;
      if (departments.length > 0) {
        return true;
      }
      return false;
    });


    // pull data from strapi/backend
    // TODO: do we need this?
    const capstones = await api.capstones.find();
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();

    const {data: {roles}} = await api.getRoles();
    console.log(roles);
    const roleIdToName = roles.reduce((map, role) => {
      map[role.id] = role.name;
      return map;
    }, {});
    console.log(roleIdToName);
    // const [role] = roles.filter(r => r.name === user.role);

    // sets the various states
    this.setState({capstones, sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response});

    // load the capstone to edit if exist
    // TODO: test upload image
    // TODO: preview semester
    // TODO: if not a created capstone, clear, else reset all things
    if (this.props.editId) {
      const editCapstone = await api.capstones.findOne('5e99c90f5350f40031d08f1c');
      console.log(editCapstone);

      const dept = departmentList.filter(dept => dept.id === editCapstone.departments);
      console.log(editCapstone.members);
      const members = _.cloneDeep(editCapstone.members);
      const teamMembers = members.filter(member => roleIdToName[member.role] !== 'TeachingAssistant'
        && roleIdToName[member.role] !== 'Professor'
      );
      const professor = members.filter(member => roleIdToName[member.role] === 'Professor');
      const TA = members.filter(member => roleIdToName[member.role] === 'TeachingAssistant');
      console.log(professor);
      this.setState({
        name: editCapstone.name,
        course: editCapstone.course,
        semester: editCapstone.semester,
        startDate: editCapstone.startDate,
        endDate: editCapstone.endDate,
        isFeatured: editCapstone.isFeatured,
        departments: _.cloneDeep(editCapstone.departments),
        preview: editCapstone.preview,
        description: editCapstone.description,
        members: teamMembers,
        selectedProfessor: professor[0],
        selectedTA: TA[0],
        thumbnail: [editCapstone.thumbnail,],
        cover: editCapstone.cover,
        media: editCapstone.media,
        capstoneId: this.props.editId
      });
    }

  }

  handleSelectedPerson = name => (event, values) => {
    this.setState({[name]: values});
  };

  handleConfirmDepartment = (selectedDepartment) => {
    const {departments} = this.state;
    if (selectedDepartment !== '' && !departments.includes(selectedDepartment)) {
      const joinedDepartments = departments.concat(selectedDepartment);
      this.setState({departments: joinedDepartments});
    }
  };

  handleRemoveDepartment = (selectDepartmentId) => {
    const copyOfDepartments = _.cloneDeep(this.state.departments);
    this.setState({
      departments: copyOfDepartments.filter(t => selectDepartmentId !== t.id)
    });
  };

  handleConfirmSponsor = (selectedSponsor) => {
    const {checkedSponsors} = this.state;
    if (selectedSponsor !== '') {
      if (!checkedSponsors.includes(selectedSponsor)) {
        const joinedSponsor = checkedSponsors.concat(selectedSponsor);
        this.setState({checkedSponsors: joinedSponsor});
      }
    }
  };

  handleRemoveSponsor = (selectedSponsorId) => {
    const copyOfSponsors = _.cloneDeep(this.state.checkedSponsors);
    this.setState({
      checkedSponsors: copyOfSponsors.filter(t => selectedSponsorId !== t.id)
    });
  };


  handleConfirmTeammate = (selectedUser) => {
    const user = selectedUser;
    if (user !== '') {
      if (!this.state.members.includes(user)) {
        const joinedMembers = this.state.members.concat(user);
        this.setState({members: joinedMembers});
      }
    }
  };

  handleRemoveTeammate = (selectedUserId) => {
    const copyOfMembers = _.cloneDeep(this.state.members);
    this.setState({
      members: copyOfMembers.filter(t => selectedUserId !== t.id)
    });
  };

  handleStartDate = (startDate) => {
    if (!startDate) {
      return;
    }
    this.setState({startDate}, () => {
      if (this.state.startDate.getTime() > this.state.endDate.getTime()) {
        this.setState({endDate: startDate});
      }
    });
  };

  handleEndDate = (endDate) => {
    if (!endDate) {
      return;
    }
    this.setState({endDate}, () => {
      if (this.state.endDate.getTime() < this.state.startDate.getTime()) {
        this.setState({startDate: endDate});
      }
    });
  };

  handleNewUser = (newUser) => {
    this.setState({...newUser});
  };

  handleSelectSponsor = (event) => {
    this.setState({selectedSponsor: event.target.value});
  };

  setThumbnail = (thumbnail) => {
    this.setState({thumbnail});
  };

  setCover = (cover) => {
    this.setState({cover});
  };

  setMedia = (media) => {
    this.setState({media});
  };


  setRemoveImage = (remove) => {
    this.setState({removeImg: remove});
  };

  extractNonMediaContent = () => {
    const {
      name,
      isFeatured,
      course,
      startDate,
      endDate,
      departments,
      description,
      members,
      selectedProfessor,
      selectedTA,
      preview,
      checkedSponsors,
      semester
    } = this.state;
    const upload_content = {
      name,
      isFeatured,
      startDate,
      endDate,
      preview,
      semester
    };
    if (course !== '') {
      upload_content.course = course;
    }
    if (semester !== '') {
      upload_content.semester = semester;
    }
    if (departments.length > 0) {
      upload_content.departments = departments.map(s => s.id);
    }
    if (description !== '') {
      upload_content.description = description;
    }
    if (members.length > 0) {
      const UserIDs = members.map(p => p.id);
      upload_content.members = UserIDs;
    }
    if (selectedTA !== '') {
      upload_content.members.concat(selectedTA.id);
    }
    if (selectedProfessor !== '') {
      upload_content.members.concat(selectedProfessor.id);
    }
    if (checkedSponsors.length > 0) {
      upload_content.sponsors = checkedSponsors.map(s => s.id);
    }
    return upload_content;
  };

  clearCurrentCapstone = () => {
    this.setState({
      name: '',
      description: '',
      preview: '',
      semester: '',
      isFeatured: false,
      startDate: new Date(),
      endDate: new Date(),
      cover: [],
      thumbnail: [],
      media: [],
      departments: [],
      capstones: [],
      checkedSponsors: [],
      selectedSponsor: '',
      members: [],
      selectedProfessor: '',
      selectedTA: '',
      course: '',
      capstoneId: '',
      removeImg: true,
      deletedThumbnail: [],
      deletedCoverPhoto: [],
      deletedMedia: []
    });
  };

  handleSubmit = async () => {
    await this.handleUpload(true);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('successful submit!', snack.success);
    await this.clearCurrentCapstone();
  };

  handleSave = async () => {
    await this.handleUpload(false);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('successful saved!', snack.success);
  };

  uploadImage = async () => {
    const {
      thumbnail,
      cover,
      media,
      deletedThumbnail,
      deletedCover,
      deletedMedia
    } = this.state;
    if (this.state.capstoneId === '') {
      return;
    }
    const {capstoneId} = this.state;
    // upload thumbnail
    if (thumbnail.length > 0 && !thumbnail[0].id) {
      const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
      await api.uploads.upload(thumbnailUpload);
    }

    if (deletedThumbnail.length > 0) {
      await api.uploads.delete(deletedThumbnail[0]);
    }

    if (cover.length > 0) {
      const coverUploads = cover.map(file => {
        if (!file.id) {
          const upload = formatEntryUpload(file, 'capstones', capstoneId, 'cover');
          return api.uploads.upload(upload);
        }
      });
      await Promise.all(coverUploads);
    }

    if (deletedCover.length > 0) {
      const deleted = deletedCover.map(fileId => api.uploads.delete(fileId));
      await Promise.all(deleted);
    }

    if (media.length > 0) {
      const mediaUploads = media.map(file => {
        if (!file.id) {
          const upload = formatEntryUpload(file, 'capstones', capstoneId, 'media');
          return api.uploads.upload(upload);
        }
      });
      await Promise.all(mediaUploads);
    }

    if (deletedMedia.length > 0) {
      const deleted = deletedMedia.map(fileId => api.uploads.delete(fileId));
      await Promise.all(deleted);
    }
    // if have old
    // if have new && not equal (new does not have id)
    // delete old && upload new
    // no new
    // delete old
    // nothing
    // nothing
    // else
    // upload new
    // if (oldThumbnail.length > 0) {
    //   if (thumbnail.length > 0 && !thumbnail[0].id) {
    //     const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
    //     let resp = await api.uploads.upload(thumbnailUpload);
    //     this.setState({oldThumbnail: resp.data});
    //     await api.uploads.delete(oldThumbnail[0].id);
    //   }
    //   else if (thumbnail.length === 0) {
    //     await api.uploads.delete(oldThumbnail[0].id);
    //   }
    // }
    // else {
    //   if (thumbnail.length > 0) {
    //     const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
    //     let resp = await api.uploads.upload(thumbnailUpload);
    //     this.setState({oldThumbnail: resp.data});
    //   }
    // }


    // upload media
    // if (media && media.length > 0) {
    //   const mediaUploads = media.map(file => {
    //     const upload = formatEntryUpload(file, 'capstones', capstoneId, 'media');
    //     return api.uploads.upload(upload);
    //   });
    //   await Promise.all(mediaUploads);
    // }
    //
    //
    // // upload media
    // if (cover && cover.length > 0) {
    //   const coverUploads = cover.map(file => {
    //     const upload = formatEntryUpload(file, 'capstones', capstoneId, 'cover');
    //     return api.uploads.upload(upload);
    //   });
    //   await Promise.all(coverUploads);
    // }

  };

  // TODO: make every photo different name
  handleUpload = async (isFinishedEditing) => {
    const {
      Users,
      AllUsers,
      capstoneId
    } = this.state;

    const upload_data = this.extractNonMediaContent();
    upload_data.isFinishedEditing = isFinishedEditing;
    let response;
    // no previous capstone id, create
    if (capstoneId === '') {
      response = await api.capstones.create(upload_data);
      // save the returned ID for next editing
      const refId = response.data.id;
      this.setState({capstoneId: refId});
    }
    // previous capstone id, update
    else {
      await api.capstones.update(capstoneId, upload_data);
    }

    // upload images
    await this.uploadImage();

    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };


  render() {
    const {classes} = this.props;
    const {cover, media, thumbnail} = this.state;
    const {setCover, setMedia, setThumbnail} = this;

    return(
      <div>
        {/* Page header */}
        <ValidatorForm
          ref='form'
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container justify='center'>
            <BasicInformation
              classes={classes}
              handleChange={this.handleChange.bind(this)}
              handleChangeSwitch={this.handleChangeSwitch.bind(this)}
              handleStartDate={this.handleStartDate.bind(this)}
              handleEndDate={this.handleEndDate.bind(this)}
              handelConfirmDepartment={this.handleConfirmDepartment.bind(this)}
              handleRemoveDepartment={this.handleRemoveDepartment.bind(this)}
              handleDescription={this.handleDescription.bind(this)}
              {...this.state}
            />
            <MemberInformation
              classes={classes}
              handleConfirmTeammate={this.handleConfirmTeammate.bind(this)}
              handleRemoveTeammate={this.handleRemoveTeammate.bind(this)}
              handleNewUser={this.handleNewUser.bind(this)}
              handleSelectedPerson={this.handleSelectedPerson.bind(this)}
              {...this.state}
            />
            <SponsorAndMediaInformation
              classes={classes}
              handleSelectSponsor={this.handleSelectSponsor.bind(this)}
              handleConfirmSponsor={this.handleConfirmSponsor.bind(this)}
              handleRemoveSponsor={this.handleRemoveSponsor.bind(this)}
              thumbnail={thumbnail}
              cover={cover}
              media={media}
              setThumbnail={setThumbnail}
              setCover={setCover}
              setMedia={setMedia}
              deletedThumbnail={this.deletedThumbnail.bind(this)}
              deletedCover={this.deletedCover.bind(this)}
              deletedMedia={this.deletedMedia.bind(this)}
              {...this.state}

            />
            <Grid item xs={12} md={10}>
              <Grid container justify='space-around' spacing={3} alignItems='center'>
                <Grid item xs={3}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={this.handleSave}
                    style={{marginTop: '1%'}}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    style={{marginTop: '1%'}}
                  >
                    Add Capstone
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    style={{marginTop: '1%'}}
                    onClick={this.clearCurrentCapstone}
                  >
                    Cancel
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>

      </div>
    );
  }
}


export default compose(
  withStyles(styles),
  withWidth(),
  withSnackbar,
)(CreateCapstone);
