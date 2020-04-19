import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import Filter from 'bad-words';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import BasicInformation from './BasicInformation';
import StorageManager from '../../Contexts/StorageManager';
import MemberInformation from './MemberInformation';
import SponsorAndMediaInformation from './SponsorAndMediaInformation';
import {formatEntryUpload} from "../../utils/utils";
import {snack} from '../../utils/Snackbar';
import {withSnackbar} from 'notistack';
import _ from 'lodash';


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
      title: '',
      isFeatured: false,
      startDate: new Date(),
      endDate: new Date(),
      coverPhoto: [],
      thumbnail: [],
      media: [],
      Department: '',
      Username: StorageManager.getItem('user')._id,
      capstones: [],
      departmentList: [],
      sponsorList: [],
      checkedSponsors: [],
      selectedSponsor: '',
      AllUsers: [],
      Users: [],
      Participants: [],
      selectedProfessor: '',
      selectedTA: '',
      selectedUser: '',
      dialogOpen: false,
      courseName: '',
      capstoneId: '',
      removeImg:false
    };
  }

  async componentDidMount() {
    // pull data from strapi/backend
    const capstones = await api.capstones.find();
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();
    // sets the various states
    console.log(departmentList);
    this.setState({capstones, sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response}, () => {
      console.log(this.state.Users);
    });
  }

  handleChangeDepartment = (event) => {
    console.log(event.target.value);
    this.setState({Department: event.target.value});
  };

  handleSelectedProfessor = (event, values) => {
    console.log(values);
    this.setState({selectedProfessor: values});
  };

  handleSelectedTA = (event, values) => {
    this.setState({selectedTA: values});
  };

  handleClickDialogClose = () => {
    this.setState({dialogOpen: false});
  };

  handleClickDialogOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleConfirmSponsor = (selectedSponsor) => {
    const {checkedSponsors} = this.state;
    if(selectedSponsor !== '') {
      if (!checkedSponsors.includes(selectedSponsor)) {
        const joinedSponsor = checkedSponsors.concat(selectedSponsor);
        this.setState({checkedSponsors: joinedSponsor});
      }
    }
  };

  handleRemoveSponsor = (selectedSponsorId) => {
    console.log(selectedSponsorId);
    const copyOfSponsors = _.cloneDeep(this.state.checkedSponsors);
    this.setState({checkedSponsors: copyOfSponsors.filter(t => {
        return selectedSponsorId !== t.id;
      })}, () => {
      console.log(this.state.checkedSponsors);
    });
  };


  handleConfirmTeammate = (selectedUser) => {
    const user = selectedUser;
    if (user !== '') {
      if (!this.state.Participants.includes(user)) {
        const joinedParticipants = this.state.Participants.concat(user);
        this.setState({Participants: joinedParticipants}, () => {
          console.log(this.state.Participants);
        });
      }
    }
  };

  handleRemoveTeammate = (selectedUserId) => {
    const copyOfParticipants = _.cloneDeep(this.state.Participants);
    this.setState({Participants: copyOfParticipants.filter(t => {
        return selectedUserId !== t.id;
      })}, () => {
      console.log(this.state.Participants);
    });
  };



  handleStartDate = (startDate) => {
    this.setState({startDate}, () => {
      if (this.state.startDate.getTime() > this.state.endDate.getTime()) {
        this.setState({endDate: startDate});
      }
    });
  };

  handleEndDate = (endDate) => {
    this.setState({endDate}, () => {
      if (this.state.endDate.getTime() < this.state.startDate.getTime()) {
        this.setState({startDate: endDate});
      }
    });
  };

  handleDescription = (event) => {
    this.setState({description: event.target.value});
  };

  handleTitle = (event) => {
    this.setState({title: event.target.value});
  };

  handleCourseName = (event) => {
    this.setState({courseName: event.target.value});
  };

  handleNewUser = (newUser) => {
    this.setState({...newUser});
  };

  handleSelectSponsor = (event) => {
    this.setState({selectedSponsor: event.target.value});
  };

  handleAcceptImageThumbnail = (image) => {
    this.setState({thumbnail: image});
  };

  handleAcceptImageCoverPhoto = (image) => {
    this.setState({coverPhoto: image}, () => {
      console.log(this.state.coverPhoto);
    });
  };

  handleAcceptImageMedia = (image) => {
    this.setState({media: image}, () => {
      console.log(this.state.media);
    });
  };

  handleChangeSwitchFeature = (event) => {
    this.setState({isFeatured: event.target.checked});
  };

  setRemoveImage = (remove) => {
    this.setState({removeImg: remove});
  };

  extractNonMediaContent = () => {
    const {
      title,
      Username,
      isFeatured,
      courseName,
      startDate,
      endDate,
      Department,
      description,
      Participants,
      selectedProfessor,
      selectedTA,
      checkedSponsors
    } = this.state;
    const upload_content = {
      name: title,
      moderator: Username,
      isFeatured: isFeatured,
      startDate: startDate,
      endDate: endDate
    };
    if (courseName !== '') {
      upload_content.courseName = courseName;
    }
    if (Department !== '') {
      console.log(Department);
      upload_content.department = [Department.id, ];
    }
    if (description !== '') {
      upload_content.description = description;
    }
    if (Participants.length > 0) {
      const UserIDs = Participants.map(p => p.id);
      upload_content.members = UserIDs;
    }
    if (selectedTA !== '') {
      upload_content.TA = selectedTA.id;
    }
    if (selectedProfessor !== '') {
      upload_content.professor = selectedProfessor.id;
    }
    if (checkedSponsors.length > 0) {
      upload_content.sponsors = checkedSponsors.map(s => s.id);
    }
    return upload_content;
  };

  clearCurrentCapstone = () => {
    this.setState({
      title: '',
      description: '',
      isFeatured: false,
      startDate: new Date(),
      endDate: new Date(),
      coverPhoto: [],
      thumbnail: [],
      media: [],
      Department: '',
      capstones: [],
      checkedSponsors: [],
      selectedSponsor: '',
      Participants: [],
      selectedProfessor: '',
      selectedTA: '',
      courseName: '',
      capstoneId: '',
      removeImg: true
    });
    this.forceUpdate();
    // window.location.reload(false);
  };

  handleSubmit = async () => {
    console.log('???');
    // if (!this.isFormValidForSubmit()) {
    //   return;
    // }
    this.handleUpload();
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('successful submit!', snack.success);
    await this.clearCurrentCapstone();
  };

  handleSave = async () => {
    if (!this.isFormValidForSave()) {
      return;
    }
    await this.handleUpload(false);
    const {enqueueSnackbar} = this.props;
    enqueueSnackbar('successful upload!', snack.success);
  };

  uploadImage = async () => {
    const {
      thumbnail,
      coverPhoto,
      media
    } = this.state;
    if (this.state.capstoneId === '') {
      return;
    }
    const capstoneId = this.state.capstoneId;
    // upload thumbnail
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
      let data = await api.uploads.upload(thumbnailUpload);
    }

    // upload media
    if (media && media.length > 0) {
      const mediaUploads = media.map(file => {
        const upload = formatEntryUpload(file, 'capstones', capstoneId, 'media');
        return api.uploads.upload(upload);
      });
      const respMedia = Promise.all(mediaUploads);
    }


    // upload media
    if (coverPhoto && coverPhoto.length > 0) {
      const coverPhotoUploads = coverPhoto.map(file => {
        const upload = formatEntryUpload(file, 'capstones', capstoneId, 'coverPhoto');
        return api.uploads.upload(upload);
      });
      const respCover = Promise.all(coverPhotoUploads);
    }

  };

  handleUpload = async (isFinished) => {
    const {
      Users,
      AllUsers,
      thumbnail,
      coverPhoto,
      media
    } = this.state;

    let upload_data = this.extractNonMediaContent();
    upload_data.isFinished = isFinished;
    const response = await api.capstones.create(upload_data);

    const refId = response.data.id;
    this.setState({capstoneId: refId});
    // upload thumbnail
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', refId, 'thumbnail');
      let data = await api.uploads.upload(thumbnailUpload);
    }

    // upload media
    if (media && media.length > 0) {
      const mediaUploads = media.map(file => {
        const upload = formatEntryUpload(file, 'capstones', refId, 'media');
        return api.uploads.upload(upload);
      });
      const respMedia = Promise.all(mediaUploads);
    }


    // upload media
    if (coverPhoto && coverPhoto.length > 0) {
      const coverPhotoUploads = coverPhoto.map(file => {
        const upload = formatEntryUpload(file, 'capstones', refId, 'coverPhoto');
        return api.uploads.upload(upload);
      });
      const respCover = Promise.all(coverPhotoUploads);
    }


    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };

  checkForRequiredField = () => {
    const { title } = this.state;
    const {enqueueSnackbar} = this.props;

    if (!title || title === '') {
      enqueueSnackbar('must include a title', snack.error);
      return false;
    }
    return true;
  };

  checkForProfane = () => {
    const {enqueueSnackbar} = this.props;
    const { title, description, courseName } = this.state;
    const filter = new Filter();
    let content = [];
    if (filter.isProfane(title)) {
      content.push("title");
    }
    if (filter.isProfane(description)) {
      content.push("description");
    }
    if (filter.isProfane(courseName)) {
      content.push("course name");
    }
    if (content.length > 0) {
      enqueueSnackbar("Eww, following field contains illegal word: " + content.join(' '), snack.error);
      return false;
    }
    return true;
  };

  checkFilledAllFieldForSubmit = () => {
    const {enqueueSnackbar} = this.props;
    const { title, description, courseName, Participants, checkedSponsors, selectedProfessor, selectedTA } = this.state;
    let valid = true;
    if (!title || title === '') {
      valid = false;
      enqueueSnackbar('must include a title', snack.error);
    }
    if (!description || description === '') {
      valid = false;
      enqueueSnackbar('must include a description', snack.error);
    }
    if (!courseName || courseName === '') {
      valid = false;
      enqueueSnackbar('must include a course name', snack.error);
    }
    if (!Participants || Participants.length === 0) {
      valid = false;
      enqueueSnackbar('must select a team member', snack.error);
    }
    if (!checkedSponsors || checkedSponsors.length === 0) {
      valid = false;
      enqueueSnackbar('must select a sponsor', snack.error);
    }
    if (!selectedProfessor || selectedProfessor === '') {
      valid = false;
      enqueueSnackbar('must select a professor', snack.error);
    }
    if (!selectedTA || selectedTA === '') {
      valid = false;
      enqueueSnackbar('must select a TA', snack.error);
    }
    return valid;
  };


  isFormValidForSave = () => {
    return this.checkForRequiredField() && this.checkForProfane();

  };

  isFormValidForSubmit = () => {
    return this.checkForRequiredField() && this.checkFilledAllFieldForSubmit() && this.checkForProfane();
  };

  render() {
    const {classes} = this.props;

    return(
      <div>
        {/* Page header */}
        <Grid container justify='center'>
          <BasicInformation
            classes={classes}
            title={this.state.title}
            courseName={this.state.courseName}
            handleTitle={this.handleTitle.bind(this)}
            isFeatured={this.state.isFeatured}
            handleCourseName={this.handleCourseName.bind(this)}
            handleChangeSwitchFeature={this.handleChangeSwitchFeature.bind(this)}
            startDate={this.state.startDate}
            handleStartDate={this.handleStartDate.bind(this)}
            endDate={this.state.endDate}
            handleEndDate={this.handleEndDate.bind(this)}
            Department={this.state.Department}
            handleChangeDepartment={this.handleChangeDepartment.bind(this)}
            departmentList={this.state.departmentList}
            handleDescription={this.handleDescription.bind(this)}
            description={this.state.description}
          />
          <MemberInformation
            classes={classes}
            AllUsers={this.state.AllUsers}
            handleConfirmTeammate={this.handleConfirmTeammate.bind(this)}
            handleRemoveTeammate={this.handleRemoveTeammate.bind(this)}
            handleClickDialogOpen={this.handleClickDialogOpen.bind(this)}
            handleNewUser={this.handleNewUser.bind(this)}
            dialogOpen={this.state.dialogOpen}
            handleClickDialogClose={this.handleClickDialogClose.bind(this)}
            Participants={this.state.Participants}
            selectedProfessor={this.state.selectedProfessor}
            selectedTA={this.state.selectedTA}
            handleSelectedProfessor={this.handleSelectedProfessor.bind(this)}
            handleSelectedTA={this.handleSelectedTA.bind(this)}
            selectedUser={this.state.selectedUser}
          />
          <SponsorAndMediaInformation
            removeImg={this.state.removeImg}
            setRemoveImg={this.setRemoveImage.bind(this)}
            classes={classes}
            selectedSponsor={this.state.selectedSponsor}
            handleSelectSponsor={this.handleSelectSponsor.bind(this)}
            checkedSponsors={this.state.checkedSponsors}
            sponsorList={this.state.sponsorList}
            handleConfirmSponsor={this.handleConfirmSponsor.bind(this)}
            handleRemoveSponsor={this.handleRemoveSponsor.bind(this)}
            handleAcceptImageThumbnail={this.handleAcceptImageThumbnail.bind(this)}
            handleAcceptImageCoverPhoto={this.handleAcceptImageCoverPhoto.bind(this)}
            handleAcceptImageMedia={this.handleAcceptImageMedia.bind(this)}
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
                  onClick={this.handleSubmit}
                  style={{marginTop: '1%'}}
                >
                  Add Capstone
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
                  Cancel
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default compose(
  withStyles(styles),
  withWidth(),
  withSnackbar,
)(CreateCapstone);
