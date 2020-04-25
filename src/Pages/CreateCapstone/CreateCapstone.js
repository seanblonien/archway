import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import Filter from 'bad-words';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {withSnackbar} from 'notistack';
import _ from 'lodash';
import {ValidatorForm} from 'react-material-ui-form-validator';
import api from '../../Services/api';
import BasicInformation from './BasicInformation';
import StorageManager from '../../Contexts/StorageManager';
import MemberInformation from './MemberInformation';
import SponsorAndMediaInformation from './SponsorAndMediaInformation';
import {uploadImage} from './CapstoneUtils';
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
      deletedCover: [],
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

  async componentDidMount() {

    ValidatorForm.addValidationRule('isProfane', value => {
      const filter = new Filter();
      return !filter.isProfane(value);
    });

    ValidatorForm.addValidationRule('haveMembers', () => {
      const {members} = this.state;
      return members.length > 0;
    });

    ValidatorForm.addValidationRule('haveProfessor', () => {
      const {selectedProfessor} = this.state;
      return selectedProfessor !== '';
    });

    ValidatorForm.addValidationRule('haveTA', () => {
      const {selectedTA} = this.state;
      return selectedTA !== '';
    });

    ValidatorForm.addValidationRule('haveDepartment', () => {
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
    const roleIdToName = roles.reduce((map, role) => {
      map[role.id] = role.name;
      return map;
    }, {});
    // sets the various states
    this.setState({capstones, sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response});

    // TODO: if not a created capstone, clear, else reset all things
    const editId = '5e99c90f5350f40031d08f1c';
    if (editId) {
      const editCapstone = await api.capstones.findOne(editId);

      // const dept = departmentList.filter(dept => dept.id === editCapstone.departments);
      const members = _.cloneDeep(editCapstone.members);
      const teamMembers = members.filter(member => roleIdToName[member.role] !== 'TeachingAssistant'
        && roleIdToName[member.role] !== 'Professor'
      );
      const professor = members.filter(member => roleIdToName[member.role] === 'Professor');
      const TA = members.filter(member => roleIdToName[member.role] === 'TeachingAssistant');
      const thumbnail = editCapstone.thumbnail ? [editCapstone.thumbnail, ] : [];
      const cover = editCapstone.cover ? editCapstone.cover : [];
      const media = editCapstone.media ? editCapstone.media : [];
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
        thumbnail,
        cover,
        media,
        checkedSponsors: editCapstone.sponsors,
        capstoneId: editId
      });
    }

  }

  handleDescription = content => {
    this.setState({'description': content});
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  toDeletedThumbnail = deletedFileId => {
    const {deletedThumbnail} = this.state;
    if (deletedFileId !== '') {
      if (!deletedThumbnail.includes(deletedFileId)) {
        const joined = deletedThumbnail.concat(deletedFileId);
        this.setState({deletedThumbnail: joined});
      }
    }
  };

  toDeletedCover = deletedFileId => {
    const {deletedCover} = this.state;
    if (deletedFileId !== '') {
      if (!deletedCover.includes(deletedFileId)) {
        const joined = deletedCover.concat(deletedFileId);
        this.setState({deletedCover: joined});
      }
    }
  };

  toDeletedMedia = deletedFileId => {
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
    const {departments} = this.state;
    const copyOfDepartments = _.cloneDeep(departments);
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
    const {checkedSponsors} = this.state;
    const copyOfSponsors = _.cloneDeep(checkedSponsors);
    this.setState({
      checkedSponsors: copyOfSponsors.filter(t => selectedSponsorId !== t.id)
    });
  };


  handleConfirmTeammate = (selectedUser) => {
    const user = selectedUser;
    const {members} = this.state;
    if (user !== '') {
      if (!members.includes(user)) {
        const joinedMembers = members.concat(user);
        this.setState({members: joinedMembers});
      }
    }
  };

  handleRemoveTeammate = (selectedUserId) => {
    const {members} = this.state;
    const copyOfMembers = _.cloneDeep(members);
    this.setState({
      members: copyOfMembers.filter(t => selectedUserId !== t.id)
    });
  };

  handleStartDate = (startDateInput) => {
    const {startDate, endDate} = this.state;
    if (!startDateInput) {
      return;
    }
    this.setState({startDate: startDateInput}, () => {
      if (startDate.getTime() > endDate.getTime()) {
        this.setState({endDate: startDateInput});
      }
    });
  };

  handleEndDate = (endDateInput) => {
    const {startDate, endDate} = this.state;
    if (!endDateInput) {
      return;
    }
    this.setState({endDate: endDateInput}, () => {
      if (endDate.getTime() < startDate.getTime()) {
        this.setState({startDate: endDateInput});
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

  setCover = (coverPic, replace=false) => {
    if (!replace) {
      const {cover} = this.state;
      if (cover.length > 0) {
        this.setState({cover: cover.concat(coverPic)});
      } else {
        this.setState({cover: coverPic});
      }
    }
    else {
      this.setState({cover: coverPic});
    }
  };

  setMedia = (mediaPic, replace=false) => {
    if (!replace) {
      const {media} = this.state;
      if (media.length > 0) {
        this.setState({media: media.concat(mediaPic)});
      }
      else {
        this.setState({media: mediaPic});
      }
    }
    else {
      this.setState({media: mediaPic});
    }

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
    const uploadContent = {
      name,
      isFeatured,
      startDate,
      endDate,
      preview,
      semester
    };
    if (course !== '') {
      uploadContent.course = course;
    }
    if (semester !== '') {
      uploadContent.semester = semester;
    }
    if (departments.length > 0) {
      uploadContent.departments = departments.map(s => s.id);
    }
    if (description !== '') {
      uploadContent.description = description;
    }
    if (members.length > 0) {
      const UserIDs = members.map(p => p.id);
      uploadContent.members = UserIDs;
    }
    if (selectedTA && selectedTA !== '' && selectedTA !== []) {
      uploadContent.members = uploadContent.members.concat(selectedTA.id);
    }
    if (selectedProfessor && selectedProfessor !== '' && selectedProfessor !== []) {
      uploadContent.members = uploadContent.members.concat(selectedProfessor.id);
    }
    if (checkedSponsors.length > 0) {
      uploadContent.sponsors = checkedSponsors.map(s => s.id);
    }
    return uploadContent;
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
      deletedCover: [],
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

  handleUpload = async (isFinishedEditing) => {
    const {
      Users,
      AllUsers,
      capstoneId
    } = this.state;

    const uploadData = this.extractNonMediaContent();
    uploadData.isFinishedEditing = isFinishedEditing;
    let response;
    // no previous capstone id, create
    if (capstoneId === '') {
      response = await api.capstones.create(uploadData);
      // save the returned ID for next editing
      const refId = response.data.id;
      this.setState({capstoneId: refId});
    }
    // previous capstone id, update
    else {
      await api.capstones.update(capstoneId, uploadData);
    }

    // upload images
    await uploadImage(this.state);

    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };


  render() {
    const {classes} = this.props;
    const {enqueueSnackbar} = this.props;
    const {cover, media, thumbnail} = this.state;
    const {setCover, setMedia, setThumbnail} = this;

    return(
      <div>
        {/* Page header */}
        <ValidatorForm
          onSubmit={this.handleSubmit}
          onError={() => enqueueSnackbar('problem submitting', snack.error)}
        >
          <Grid container justify='center'>
            <BasicInformation
              classes={classes}
              handleChange={this.handleChange}
              handleChangeSwitch={this.handleChangeSwitch}
              handleStartDate={this.handleStartDate}
              handleEndDate={this.handleEndDate}
              handleConfirmDepartment={this.handleConfirmDepartment}
              handleRemoveDepartment={this.handleRemoveDepartment}
              handleDescription={this.handleDescription}
              {...this.state}
            />
            <MemberInformation
              classes={classes}
              handleConfirmTeammate={this.handleConfirmTeammate}
              handleRemoveTeammate={this.handleRemoveTeammate}
              handleNewUser={this.handleNewUser}
              handleSelectedPerson={this.handleSelectedPerson}
              {...this.state}
            />
            <SponsorAndMediaInformation
              classes={classes}
              handleSelectSponsor={this.handleSelectSponsor}
              handleConfirmSponsor={this.handleConfirmSponsor}
              handleRemoveSponsor={this.handleRemoveSponsor}
              thumbnail={thumbnail}
              cover={cover}
              media={media}
              setThumbnail={setThumbnail}
              setCover={setCover}
              setMedia={setMedia}
              toDeleteThumbnail={this.toDeletedThumbnail}
              toDeleteCover={this.toDeletedCover}
              toDeleteMedia={this.toDeletedMedia}
              {...this.state}

            />
            <Grid item xs={12} md={10}>
              <Grid container justify='space-around' spacing={3} alignItems='center'>
                <Grid item xs={3}>
                  <Button
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

CreateCapstone.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
  withSnackbar,
)(CreateCapstone);
