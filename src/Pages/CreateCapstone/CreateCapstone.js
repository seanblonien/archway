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
      coverPhoto: '',
      thumbnail: '',
      media: [],
      Department: '',
      Username: StorageManager.getItem('user'),
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
      typedName: '',
      typedEmail: '',
      selectedUser: '',
      dialogOpen: false,
      courseName: ''
    };
  }

  async componentDidMount() {
    // pull data from strapi/backend
    const capstones = await api.capstones.find();
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();
    // sets the various states
    this.setState({capstones, sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response}, () => {
      console.log(this.state.Users);
    });
  }

  handleChangeDepartment = (event) => {
    this.setState({Department: event.target.value});
  };

  handleSelectedProfessor = (event, values) => {
    this.setState({selectProfessor: values});
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
    this.setState({coverPhoto: image});
  };

  handleAcceptImageMedia = (image) => {
    this.setState({media: image});
  };

  handleChangeSwitchFeature = (event) => {
    this.setState({isFeatured: event.target.checked});
  };

  handleSubmit = async () => {
    const { thumbnail, coverPhoto, checkedSponsors, Participants, title, startDate, endDate, description, Username, Department, Users, AllUsers, media} = this.state;
    if (coverPhoto == null) {
      return;
    }

    const sponsorIDs = checkedSponsors.map(s => s.id);
    const UserIDs = Participants.map(p => p.id);

    const upload_data = {
      name: title,
      startDate,
      endDate,
      description,
      moderator: Username,
      department: Department.id,
      members: UserIDs,
      sponsors: sponsorIDs,
    };
    console.log(upload_data);

    const response = await api.capstones.create(upload_data);
    console.log(response);

    // Get refId of post that was just made
    const refId = response.data.id;


    // Upload image and link it to existing post
    console.log(thumbnail);
    // const image = document.getElementById('file-id');
    console.log(refId);
    // console.log(image);
    const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', refId, 'thumbnail');
    let data = await api.uploads.upload(thumbnailUpload);
    const mediaUploads = media.map(file => {
      const upload = formatEntryUpload(file, 'capstones', refId, 'media');
      return api.uploads.upload(upload);
    });
    const resp = Promise.all(mediaUploads);

    console.log(data);

    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };

  containsInvalidText = (text) => {
    const filter = new Filter();
    return filter.isProfane(text);
  };

  isFormValidForSave = () => {
    const { title, description } = this.state;
    if (!title || !description) {
      console.log('non title');
      return false;
    }
    if (this.containsInvalidText(title) || this.containsInvalidText(description)) {
      console.log("bad word");
      return false;
    }
    return true;
  };

  isFormValid = () => {
    const {title, description, coverPhoto, checkedSponsors, Department, capstones} = this.state;
    const filter = new Filter();
    const profane = filter.isProfane(title) || filter.isProfane(description);
    const validName = capstones.map(c => c.name.toUpperCase()).includes(title.toUpperCase());
    // TODO: add thumbnail & media
    const res = title && description && coverPhoto && Department && (checkedSponsors.length > 0) && !validName && !profane;
    // console.log(`title: ${title}`);
    // console.log(`des: ${description}`);
    // console.log(`cover: ${coverPhoto}`);
    // console.log(`depart: ${Department}`);
    // console.log(`spon${checkedSponsors}`);
    // console.log(`valid:${validName}`);
    // console.log(`pro? ${profane}`);
    // console.log(res);

    return res;
  };

  render() {
    const {classes} = this.props;

    return(
      <div>
        {/* Page header */}
        <Grid container justify='center'>
          <BasicInformation
            classes={classes}
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
          />
          <MemberInformation
            classes={classes}
            AllUsers={this.state.AllUsers}
            handleConfirmTeammate={this.handleConfirmTeammate.bind(this)}
            handleClickDialogOpen={this.handleClickDialogOpen.bind(this)}
            handleNewUser={this.handleNewUser.bind(this)}
            dialogOpen={this.state.dialogOpen}
            handleClickDialogClose={this.handleClickDialogClose.bind(this)}
            Participants={this.state.Participants}
            handleSelectedProfessor={this.handleSelectedProfessor.bind(this)}
            handleSelectedTA={this.handleSelectedTA.bind(this)}
            selectedUser={this.state.selectedUser}
          />
          <SponsorAndMediaInformation
            classes={classes}
            selectedSponsor={this.state.selectedSponsor}
            handleSelectSponsor={this.handleSelectSponsor.bind(this)}
            checkedSponsors={this.state.checkedSponsors}
            sponsorList={this.state.sponsorList}
            handleConfirmSponsor={this.handleConfirmSponsor.bind(this)}
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
                  disabled={!this.isFormValidForSave()}
                  onClick={this.handleSubmit}
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
                  disabled={!this.isFormValid()}
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
)(CreateCapstone);
