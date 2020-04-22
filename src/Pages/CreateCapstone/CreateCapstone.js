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
import { ValidatorForm } from 'react-material-ui-form-validator';


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
      oldThumbnail: [],
      oldCoverPhoto: [],
      oldMedia: [],
      cover: [],
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

  handleChangeSwitch = name => (event) => {
    this.setState({[name]: event.target.checked});
  };

  async componentDidMount() {

    ValidatorForm.addValidationRule('isProfane', value => {
      const filter = new Filter();
      if (filter.isProfane(value)) {
        return false
      }
      return true;
    });

    ValidatorForm.addValidationRule('haveMembers', value => {
      const { members } = this.state;
      if (members.length > 0) {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('haveProfessor', value => {
      const { selectedProfessor } = this.state;
      if (selectedProfessor !== '') {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('haveTA', value => {
      const { selectedTA } = this.state;
      if (selectedTA !== '') {
        return true;
      }
      return false;
    });

    // pull data from strapi/backend
    //TODO: do we need this?
    const capstones = await api.capstones.find();
    const departmentList = await api.departments.find();
    const sponsorList = await api.sponsors.find();
    // sets the various states
    this.setState({capstones, sponsorList, departmentList});

    const response = await api.users.find();
    this.setState({Users: response, AllUsers: response});

    // load the capstone to edit if exist
    // TODO: test upload image
    // TODO: preview semester
    // TODO: if not a created capstone, clear, else reset all things
    if (this.props.editId) {
      const editCapstone = await api.capstones.findOne("5e9cead5003a0600319843e1");
      console.log(editCapstone);

    }

  }

  handleSelectedPerson = name => (event, values) => {
    this.setState({[name]: values});
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
      checkedSponsors: copyOfSponsors.filter(t => {
        return selectedSponsorId !== t.id;
      })
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
      members: copyOfMembers.filter(t => {
        return selectedUserId !== t.id;
      })
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
      Department,
      description,
      members,
      selectedProfessor,
      selectedTA,
      preview,
      checkedSponsors,
      semester
    } = this.state;
    const upload_content = {
      name: name,
      isFeatured: isFeatured,
      startDate: startDate,
      endDate: endDate,
      preview: preview,
      semester: semester
    };
    if (course !== '') {
      upload_content.course = course;
    }
    if (semester !== '') {
      upload_content.semester = semester;
    }
    if (Department !== '') {
      upload_content.department = [Department.id,];
    }
    if (description !== '') {
      upload_content.description = description;
    }
    if (members.length > 0) {
      const UserIDs = members.map(p => p.id);
      upload_content.members = UserIDs;
    }
    if (selectedTA !== '') {
      upload_content.members.concat(selectedTA.id)
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
      Department: '',
      capstones: [],
      checkedSponsors: [],
      selectedSponsor: '',
      members: [],
      selectedProfessor: '',
      selectedTA: '',
      course: '',
      capstoneId: '',
      removeImg: true,
      oldThumbnail: [],
      oldCoverPhoto: [],
      oldMedia: []
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
      media
    } = this.state;
    if (this.state.capstoneId === '') {
      return;
    }
    const capstoneId = this.state.capstoneId;
    // upload thumbnail
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
      await api.uploads.upload(thumbnailUpload);
    }

    // upload media
    if (media && media.length > 0) {
      const mediaUploads = media.map(file => {
        const upload = formatEntryUpload(file, 'capstones', capstoneId, 'media');
        return api.uploads.upload(upload);
      });
      await Promise.all(mediaUploads);
    }


    // upload media
    if (cover && cover.length > 0) {
      const coverUploads = cover.map(file => {
        const upload = formatEntryUpload(file, 'capstones', capstoneId, 'cover');
        return api.uploads.upload(upload);
      });
      await Promise.all(coverUploads);
    }

  };

  imageNeededToUpload = () => {
    const {
      oldThumbnail,
      oldCoverPhoto,
      oldMedia,
      thumbnail,
      cover,
      media
    } = this.state;
    // not a good code style
    let thumbnailUpload, coverUpload, mediaUpload;
    if (oldThumbnail.length === 0 || oldThumbnail[0].name !== thumbnail[0].name) {
      thumbnailUpload = thumbnail;
    }
    else {
      thumbnailUpload = 'no'
    }
    // old: 1 2 3
    // new 2 3 4
    let oldCoverPhotoNames = oldCoverPhoto.map(o => o.name);



    return {
      thumbnailUpload,
      coverUpload,
      mediaUpload
    }
  };

  // TODO: make every photo different name
  handleUpload = async (isFinished) => {
    const {
      Users,
      AllUsers,
      capstoneId
    } = this.state;

    let upload_data = this.extractNonMediaContent();
    upload_data.isFinished = isFinished;
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
      response = await api.capstones.update(capstoneId, upload_data);
    }

    // upload images
    await this.uploadImage();

    // const resultImages = this.imageNeededToUpload();
    //
    // if (resultImages.thumbnailUpload !== 'no') {
    //   // upload thumbnail
    // }
    //
    // api.uploads.delete();


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
          ref="form"
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
