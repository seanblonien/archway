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
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Filter from 'bad-words';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import SimpleDialog from '../Components/Admin/AddUserDialog';
import ArchwayDatePicker from '../Components/ArchwayDatePicker';
import DragAndDropZone from '../Components/DragAndDropZone/DragAndDropZone';
import api from '../Services/api';

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

class CreateCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      cover: '',
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
      typedName: '',
      typedEmail: '',
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
    this.setState({Users: response.data, AllUsers: response.data});
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
    const {typedName, typedEmail, Participants} = this.state;
    if (typedName !== '' && typedEmail !== '') {
      const teamMember = {name: typedName, email: typedEmail};
      if (!Participants.includes(teamMember)) {
        const joinedParticipants = Participants.concat(teamMember);
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

  handleNewUser = (newUser) => {
    this.setState({...newUser});
  };

  handleSelectSponsor = (event) => {
    this.setState({selectedSponsor: event.target.value});
  };

  handleSubmit = async () => {
    const {cover, checkedSponsors, Participants, title, startDate, endDate, description, Username, Department, Users, AllUsers} = this.state;
    if (cover == null) {
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
    formData.set('field', 'cover');

    await api.uploads.upload(formData);

    // Use Users and AllUsers eventually
    Users.filter(() => true);
    AllUsers.filter(() => true);
  };

  isFormValid = () => {
    const {title, description, cover, checkedSponsors, Department, capstones} = this.state;
    const filter = new Filter();
    const profane = filter.isProfane(title) || filter.isProfane(description);
    const validName = capstones.map(c => c.title.toUpperCase()).includes(title.toUpperCase());

    return title && description && cover && Department && (checkedSponsors.length > 0) && validName && !profane;
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
                <Typography variant='h4'>Create Capstone</Typography>
                <Grid container  justify='left' spacing={3}>
                  <Grid item xs={12}>
                    {/* Form for capstone name */}
                    <Tooltip title='Add' arrow>

                      <FormControl margin='dense' required fullWidth>
                        <TextField
                          id='outlined-textarea'
                          label='Title'
                          placeholder='Type the title for the capstone project'
                          multiline
                          variant='outlined'
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container  justify='center' spacing={2} direction='row'>
                      <Grid item xs={6}>
                        <ArchwayDatePicker label='Start Date'/>

                      </Grid>

                      <Grid item xs={6}>
                        <ArchwayDatePicker label='End Date'/>

                      </Grid>
                    </Grid>

                  </Grid>

                  <Grid item xs={12}>
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
                    <Typography variant='h4'>Team Member Information</Typography>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container  justify='center' alignItems='center'>

                      {/* name, email confirm */}
                      <Grid item xs={12}>
                        <Grid container alignItems='center' justify='left' spacing={3} direction='row'>
                          <Grid item xs={3}>
                            <FormControl fullWidth>
                              <TextField
                                id='outlined-textarea'
                                label='Name'
                                placeholder='Teammate Name'
                                variant='outlined'
                                onChange={this.handleInputName}
                              />
                            </FormControl>


                          </Grid>
                          <Grid item xs={5}>
                            <FormControl fullWidth>

                              <TextField
                                id='outlined-textarea'
                                label='Email'
                                placeholder='Teammate Email'
                                variant='outlined'
                                onChange={this.handleInputEmail}
                              />
                            </FormControl>

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
                            <SimpleDialog selectedValue={this.handleNewUser} open={dialogOpen} onClose={this.handleClickDialogClose}/>
                            {/* <AddUser/> */}
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
                            primary={participant.name}
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
                    <Typography variant='h4'>Team Member Information</Typography>
                    <Divider/>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container  justify='center' alignItems='center' spacing={2}>

                      {/* name, email confirm */}
                      <Grid item xs={12}>
                        <Grid container alignItems='center' justify='space-evenly' spacing={3} direction='row'>
                          <Grid item xs={3}>
                            <FormControl fullWidth>
                              <TextField
                                id='outlined-textarea'
                                label='Professor Name'
                                placeholder='Professor Name'
                                variant='outlined'
                                onChange={this.handleInputName}
                              />
                            </FormControl>


                          </Grid>
                          <Grid item xs={5}>
                            <FormControl fullWidth>

                              <TextField
                                id='outlined-textarea'
                                label='Professor Email'
                                placeholder='Professor Email'
                                variant='outlined'
                                onChange={this.handleInputEmail}
                              />
                            </FormControl>

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
                            <FormControl fullWidth>
                              <TextField
                                id='outlined-textarea'
                                label='TA Name'
                                placeholder='TA Name'
                                variant='outlined'
                                onChange={this.handleInputName}
                              />
                            </FormControl>


                          </Grid>
                          <Grid item xs={5}>
                            <FormControl fullWidth>

                              <TextField
                                id='outlined-textarea'
                                label='TA Email'
                                placeholder='TA Email'
                                variant='outlined'
                                onChange={this.handleInputEmail}
                              />
                            </FormControl>

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
                <Typography variant='h4'>Sponsor Information</Typography>
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
                    <DragAndDropZone/>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Card className={classes.card}>

                  <CardContent>
                    <DragAndDropZone/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10}>
            {/* Submit button */}
            <Card className={classes.card}>
              <CardContent>
                <DragAndDropZone/>
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
