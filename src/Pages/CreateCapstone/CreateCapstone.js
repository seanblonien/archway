import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import {withSnackbar} from 'notistack';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {ValidatorForm} from 'react-material-ui-form-validator';
import api from '../../Services/api';
import {snack} from '../../utils/Snackbar';
import {isProfane} from '../../utils/validation';
import BasicInformation from './BasicInformation';
import {uploadImage} from './CapstoneUtils';
import MemberInformation from './MemberInformation';
import SponsorAndMediaInformation from './SponsorAndMediaInformation';

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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: 250,
    placeholder: 'Search...'
  },
});

const initialState = {
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

class CreateCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    ValidatorForm.addValidationRule('isProfane', isProfane);
    ValidatorForm.addValidationRule('haveMembers', () => !_.isEmpty(this.state.members));
    ValidatorForm.addValidationRule('haveProfessor', () => !_.isEmpty(this.state.selectedProfessor));
    ValidatorForm.addValidationRule('haveTA', () => !_.isEmpty(this.state.selectedTA));
    ValidatorForm.addValidationRule('haveDepartment', () => !_.isEmpty(this.state.departments));
    /* eslint-enable react/destructuring-assignment */
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();
    // fetch all professors
    // const professors = await api.users.find({department_null: false});

    this.setState({sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response});

    // TODO: if not a created capstone, clear, else reset all things
    const editId = '5e99c90f5350f40031d08f1c';
    if (editId) {
      const editCapstone = await api.capstones.findOne(editId);
      const teachingAssistantID = await api.getRoleIDFromName('TeachingAssistant');
      const professorID = await api.getRoleIDFromName('Professor');
      const teamMembers = editCapstone.members.filter(member => (
        member.role !== teachingAssistantID && member.role !== professorID
      ));
      const professor = editCapstone.members.filter(member => member.role !== professorID);
      const TA = editCapstone.members.filter(member => member.role !== teachingAssistantID);

      const thumbnail = editCapstone.thumbnail ? [editCapstone.thumbnail] : [];
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

  handleChange = (event) => {
    const {checked, value, name, type} = event.target;
    this.setState({[name]: type === 'checkbox' ? checked : value});
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
    const {endDate} = this.state;
    if (!startDateInput) {
      return;
    }
    this.setState({startDate: startDateInput});
    if(startDateInput.getTime() > endDate.getTime()) {
      this.setState({endDate: startDateInput});
    }
  };

  handleEndDate = (endDateInput) => {
    const {startDate} = this.state;
    if (!endDateInput) {
      return;
    }
    this.setState({endDate: endDateInput});
    if(endDateInput.getTime() < startDate.getTime()) {
      this.setState({startDate: endDateInput});
    }
  };

  handleNewUser = (newUser) => {
    this.setState({...newUser});
  };

  handleSelectSponsor = (event) => {
    this.setState({selectedSponsor: event.target.value});
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

  handleSubmit = async () => {
    await this.handleUpload(true);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('successful submit!', snack.success);
    this.setState(initialState);
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
              handleStartDate={this.handleStartDate}
              handleEndDate={this.handleEndDate}
              setDepartments={(departments) => this.setState({departments})}
              setDescription={(description) => this.setState({description})}
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
              setCheckedSponsor={(checkedSponsors) => this.setState({checkedSponsors})}
              setThumbnail={(thumbnail) => this.setState({thumbnail})}
              setCover={(cover) => this.setState({cover})}
              setMedia={(media) => this.setState({media})}
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
                    onClick={() => this.setState(initialState)}
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