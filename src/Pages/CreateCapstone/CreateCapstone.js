import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import withWidth from '@material-ui/core/withWidth/withWidth';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Filter from 'bad-words';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import SimpleDialog from '../../Components/AddUserDialog';
import DragAndDropZone from '../../Components/DragAndDropZone/DragAndDropZone';
import PageTitleTypography from '../../Components/PageTitleTypography';
import DateFnsUtils from '@date-io/date-fns';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {DesktopDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dropzone from 'react-dropzone'



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
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      coverPhoto: '',
      thumbnail: '',
      media: [],
      Department: '',
      Username: '',
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
      dialogOpen: false
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

  handleChange = name => event => {
    const {departmentList} = this.state;
    this.setState({[name]: event.target.value});

    if (name === 'Department') {
      const department = departmentList.find(d => d.name === event.target.value);
      if(department){
        this.setState({[name]: department});
      }
    }
    if( name === 'Sponsor'){
      // TODO use sponsorList
      const {sponsorList} = this.state;
      sponsorList.filter(() => true);
    }
  };

  handleChangeDepartment = (event) => {
    this.setState({Department: event.target.value});
  };

  handleSelectedUser = (event, values) => {
    this.setState({selectedUser: values}, () => {
      console.log(this.state.selectedUser);
    });
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

  handleConfirmSponsor = () => {
    const {selectedSponsor, checkedSponsors} = this.state;
    if(selectedSponsor !== '') {
      if (!checkedSponsors.includes(selectedSponsor)) {
        const joinedSponsor = checkedSponsors.concat(selectedSponsor);
        this.setState({checkedSponsors: joinedSponsor});
      }
    }
  };

  handleConfirmTeammate = () => {
    const user = this.state.selectedUser;
    if (user !== '') {
      if (!this.state.Participants.includes(user)) {
        const joinedParticipants = this.state.Participants.concat(user);
        this.setState({Participants: joinedParticipants});
      }
    }
  };

  handleInputEmail = (event) => {
    this.setState({typedEmail: event.target.value});
  };

  handleInputName = (event) => {
    this.setState({typedName: event.target.value});
  };

  handleStartDate = (startDate) => {
    this.setState({startDate: startDate}, () => {
      if (this.state.startDate.getTime() > this.state.endDate.getTime()) {
        this.setState({endDate: startDate});
      }
    });
    console.log(this.state.Users);
  };

  handleEndDate = (endDate) => {
    this.setState({endDate: endDate}, () => {
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

  handleNewUser = (newUser) => {
    this.setState({...newUser});
  };


  handleSelectSponsor = (event) => {
    this.setState({selectedSponsor: event.target.value});
  };

  handleAcceptImageThumbnail = (image) => {
    console.log(image);
    console.log(this.state);
    this.setState({thumbnail: image});
  };

  handleAcceptImageCoverPhoto = (image) => {
    console.log(image);
    console.log(this.state);
    this.setState({coverPhoto: image});
  };

  handleAcceptImageMedia = (image) => {
    console.log(image);
    console.log(this.state);
    this.setState({media: image});
  };

  handleSubmit = async () => {
    const {coverPhoto, checkedSponsors, Participants, title, startDate, endDate, description, Username, Department, Users, AllUsers} = this.state;
    if (coverPhoto == null) {
      return;
    }

    const sponsorIDs = checkedSponsors.map(s => s.id);
    const UserIDs = Participants.map(p => p.id);

    const response = await api.capstones.create({
      title,
      startDate,
      endDate,
      description,
      moderator: Username,
      department: Department.id,
      members: UserIDs,
      sponsors: sponsorIDs,
    });

    // Get refId of post that was just made
    const refId = response.data.id;

    // Upload image and link it to existing post
    const formData = new FormData();
    const image = document.getElementById('file-id');
    formData.append('files', image.files[0], image.files[0].name);
    formData.set('refId', refId);
    formData.set('ref', 'capstone');
    formData.set('field', 'coverPhoto');

    await api.uploads.upload(formData);

    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };

  isFormValid = () => {
    const {title, description, coverPhoto, checkedSponsors, Department, capstones} = this.state;
    const filter = new Filter();
    const profane = filter.isProfane(title) || filter.isProfane(description);
    const validName = capstones.map(c => c.title.toUpperCase()).includes(title.toUpperCase());

    return title && description && coverPhoto && Department && (checkedSponsors.length > 0) && validName && !profane;
  };

  render() {
    const {classes} = this.props;
    const {Department, departmentList, dialogOpen, Participants, selectedSponsor,
      sponsorList, checkedSponsors} = this.state;

    return(
      <div>
        {/* Page header */}
        <Grid container justify='center'>
          <Grid item xs={12} md={10}>
            <Card className={classes.card}>
              <CardContent>
                <PageTitleTypography text='Create Capstone' align='left' size='h4'/>
                <Grid container  justify='left' spacing={3}>
                  <Grid item xs={12}>
                    {/* Form for capstone name */}
                    <Tooltip title='Name of Capstone' arrow>
                      <FormControl margin='dense' required fullWidth>
                        <TextField
                          id='outlined-textarea'
                          label='Title'
                          placeholder='Type the title for the capstone project'
                          multiline
                          onChange={this.handleTitle}
                          variant='outlined'
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container  justify='center' spacing={2} direction='row'>
                      {/* Start & End Date*/}
                        <Grid item xs={6}>
                          <Tooltip title='Select A Date' arrow>
                            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            <DesktopDatePicker
                                autoOk
                                variant='outlined'
                                label='Start Date'
                                placeholder='2018/01/01'
                                format='yyyy/MM/dd'
                                mask='____/__/__'
                                keyboardIcon={<EventNoteIcon/>}
                                value={this.state.startDate}
                                onChange={date => this.handleStartDate(date)}
                            />
                          </MuiPickersUtilsProvider>
                          </Tooltip>
                      </Grid>
                        <Grid item xs={6}>
                        <Tooltip title='Select A Date' arrow>
                          <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            <DesktopDatePicker
                                autoOk
                                variant='outlined'
                                label='End Date'
                                placeholder='2018/01/01'
                                format='yyyy/MM/dd'
                                mask='____/__/__'
                                keyboardIcon={<EventNoteIcon/>}
                                value={this.state.endDate}
                                onChange={date => this.handleEndDate(date)}
                            />
                          </MuiPickersUtilsProvider>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    {/* select department */}
                    <FormControl margin='dense' fullWidth variant='filled'>
                      <InputLabel ref={null}>Department</InputLabel>
                      <Select
                        labelId='demo-customized-select-label'
                        id='demo-customized-select'
                        value={Department}
                        onChange={this.handleChangeDepartment}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {departmentList.map(dept => (
                          <MenuItem value={dept.name}>{dept.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl margin='dense' required fullWidth>
                      <TextField
                        id='outlined-textarea'
                        label='Description'
                        rows='4'
                        placeholder='Type the description'
                        multiline
                        variant='outlined'
                        onChange={this.handleDescription}
                      />
                    </FormControl>

                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={10}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container  justify='left' alignItems='center' spacing={2}>
                  <Grid item xs={12}>
                    <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container  justify='center' alignItems='center'>

                      <Grid item xs={12}>
                        <Grid container alignItems='center' justify='left' spacing={3} direction='row'>
                          <Grid item xs={8}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.AllUsers}
                                getOptionLabel={(option) => option.Fullname}
                                style={{ width: 300 }}
                                onChange={this.handleSelectedUser}
                                renderInput={(params) => <TextField {...params} label="Search for Team Members" variant="outlined" />}
                            />
                          </Grid>

                          <Grid item>

                            <Button variant='outlined' color='primary' onClick={this.handleConfirmTeammate}>
                              Confirm
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant='outlined' color='primary' onClick={this.handleClickDialogOpen}>
                              Add a new user
                            </Button>
                            {/* <AddUser/> */}
                            <SimpleDialog selectedValue={this.handleNewUser} open={dialogOpen} onClose={this.handleClickDialogClose}/>
                          </Grid>
                        </Grid>

                      </Grid>
                      {/* team list */}
                      <Grid item xs={9}>
                        {Participants.map(participant =>(<ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EmojiPeopleIcon/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={participant.Fullname}
                          />
                        </ListItem>))

                        }
                      </Grid>

                    </Grid>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} md={10}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container  justify='left' alignItems='center' spacing={2}>
                  <Grid item xs={12}>
                    <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                    <Divider/>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container  justify='center' alignItems='center' spacing={2}>

                      {/* name, email confirm */}
                      <Grid item xs={12}>
                        <Grid container alignItems='center' justify='space-evenly' spacing={3} direction='row'>
                          <Grid item xs={3}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.AllUsers}
                                getOptionLabel={(option) => option.Fullname}
                                style={{ width: 300 }}
                                onChange={this.handleSelectedProfessor}
                                renderInput={(params) => <TextField {...params} label="Search for Professor" variant="outlined" />}
                            />
                          </Grid>

                          <Grid item>

                            <Button variant='outlined' color='primary' onClick={this.handleConfirmTeammate}>
                              Confirm
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container alignItems='center' justify='space-evenly' spacing={3} direction='row'>
                          <Grid item xs={3}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.AllUsers}
                                getOptionLabel={(option) => option.Fullname}
                                style={{ width: 300 }}
                                onChange={this.handleSelectedTA}
                                renderInput={(params) => <TextField {...params} label="Search for TA" variant="outlined" />}
                            />
                          </Grid>
                          <Grid item>

                            <Button variant='outlined' color='primary' onClick={this.handleConfirmTeammate}>
                              Confirm
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={10}>
            <Card className={classes.card}>
              <CardContent>
                <PageTitleTypography text='Sponsor Information' align='left' size='h5'/>
                <Divider/>
                <Grid container  justify='center'>
                  <Grid item xs={12}>

                    <Grid container  justify='center' spacing={2} alignItems='center'>
                      <Grid item xs={9}>
                        <FormControl margin='dense' fullWidth variant='filled'>
                          <InputLabel ref={null}>Sponsor</InputLabel>
                          <Select
                            labelId='demo-customized-select-label'
                            id='demo-customized-select'
                            value={selectedSponsor}
                            onChange={this.handleSelectSponsor}
                          >
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            {sponsorList.map(sponsor => (
                              <MenuItem value={sponsor.name}>{sponsor.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs>
                        <Button variant='outlined' color='primary' onClick={this.handleConfirmSponsor}>
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider/>
                  {checkedSponsors.map(sponsor =>(<ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BusinessIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={sponsor}
                    />
                  </ListItem>))
                  }
                </Grid>

              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container  justify='center' spacing={2} alignItems='center'>
              <Grid item xs={3}>
                <Card className={classes.card}>

                  <CardContent>
                    <DragAndDropZone acceptImage={this.handleAcceptImageThumbnail.bind(this)}/>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Card className={classes.card}>

                  <CardContent>
                    <DragAndDropZone acceptImage={this.handleAcceptImageCoverPhoto.bind(this)}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10}>
            {/* Submit button */}
            <Card className={classes.card}>
              <CardContent>
                <DragAndDropZone acceptImage={this.handleAcceptImageMedia.bind(this)}/>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container justify='space-around' spacing={3} alignItems='center'>
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
