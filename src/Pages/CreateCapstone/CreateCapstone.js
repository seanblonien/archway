import {Box} from '@material-ui/core';
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
import GridBox from '../../Components/LayoutWrappers/GridBox';
import GridPageContainer from '../../Components/LayoutWrappers/GridPageContainer';
import LoadingCircle from '../../Components/LoadingCircle';
import SectionTitle from '../../Components/Typography/SectionTitle';
import AuthContext from '../../Contexts/AuthContext';
import api from '../../Services/api';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
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
  professors: [],
  students: [],
  course: '',
  capstoneId: '',
  removeImg: false,
  semester: '',
  loading: true,
  isEditing: false
};

class CreateCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.initialize();
  }

  async componentDidUpdate (prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if(prevProps.match.params.capstoneID !== this.props.match.params.capstoneID) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(initialState);
      await this.initialize();
    }
  }

  initialize = async () => {
    const {match} = this.props;
    const {capstoneID} = match.params;
    const isEditing = !_.isNil(capstoneID);
    this.setState({isEditing});
    /* eslint-disable react/destructuring-assignment */
    ValidatorForm.addValidationRule('isProfane', isProfane);
    ValidatorForm.addValidationRule('haveMembers', () => !_.isEmpty(this.state.students));
    ValidatorForm.addValidationRule('haveProfessor', () => !_.isEmpty(this.state.professors));
    ValidatorForm.addValidationRule('haveDepartment', () => !_.isEmpty(this.state.departments));
    /* eslint-enable react/destructuring-assignment */
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();
    const response = await api.users.find();
    // fetch all professors
    // const professors = await api.users.find({department_null: false});
    this.setState({sponsorList, departmentList, Users: response, AllUsers: response});

    if (capstoneID && isEditing) {
      const editCapstone = await api.capstones.findOne(capstoneID);

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
        professors: editCapstone.professors,
        students: editCapstone.students,
        thumbnail,
        cover,
        media,
        checkedSponsors: editCapstone.sponsors,
        capstoneId: capstoneID
      });
    }
    this.setState({loading: false});
  }

  handleChange = (event) => {
    const {checked, value, name, type} = event.target;
    this.setState({[name]: type === 'checkbox' ? checked : value});
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
      students,
      professors,
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
    if (students.length > 0) {
      uploadContent.students = students.map(p => p.id);
    }
    if (professors.length > 0) {
      uploadContent.professors = professors.map(p => p.id);
    }
    if (checkedSponsors.length > 0) {
      uploadContent.sponsors = checkedSponsors.map(s => s.id);
    }
    return uploadContent;
  };

  handleSubmit = async () => {
    await this.handleUpload(true);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('Capstone submitted successfully!', snack.success);
    const {user}= this.context;
    history.push(routes.dashboard.viewyourcapstones.genPath(user.username));
    this.setState({...initialState, loading: false});
  };

  handleSave = async () => {
    await this.handleUpload(false);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('Capstone saved successfully!', snack.success);
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
    const {classes, enqueueSnackbar} = this.props;
    const {loading, isEditing} = this.state;

    return(
      loading ?
        <LoadingCircle/>
        :
        <GridPageContainer>
          <GridBox>
            <SectionTitle>{isEditing ? 'Edit Capstone' : 'Create Capstone'}</SectionTitle>
            <ValidatorForm
              onSubmit={this.handleSubmit}
              onError={() => enqueueSnackbar('Invalid capstone fields', snack.error)}
            >
              <div>
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
                  setStudents={(students) => this.setState({students})}
                  setProfessors={(professors) => this.setState({professors})}
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
                <Grid item xs={12} component={Box} pt={3}>
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
                        onClick={() => this.setState({...initialState, loading: false})}
                      >
                        Cancel
                      </Button>
                    </Grid>

                  </Grid>
                </Grid>
              </div>
            </ValidatorForm>
          </GridBox>
        </GridPageContainer>
    );
  }
}

CreateCapstone.contextType = AuthContext;
CreateCapstone.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  withWidth(),
  withSnackbar,
)(CreateCapstone);
