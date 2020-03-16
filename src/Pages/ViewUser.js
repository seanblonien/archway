import {CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LoadingCircle from '../Components/LoadingCircle';
import PageTitleTypography from '../Components/PageTitleTypography';
import SubHeadingTextTypography from '../Components/SubHeadingTextTypography';
import {strapi, strapiURL} from '../constants';
import * as defaultProfileImage from '../Static/default-user-profile-image-png-6.png';
import auth from '../Auth';
import history from '../utils/history';

const styles = () => ({
  card: {
    raised: true,
  },
  associatedCard: {
    raised: true,
    height: '200px',
    overflow: 'auto',
  },
  button: {
    color: 'primary',
  },
  media: {
    maxWidth: 400,
    borderRadius: '25px',
  },
  primaryButton: {
    color: 'primary',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 100,
  },
  center: {
    display: 'block',
    width: '50%',
  }
});

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: '',
      open: false,
      Bio: '',
      Department: '',
      ProfilePicture: '',
      Fullname: '',
      oldBio: '',
      oldFullName: '',
      editable: false,
      departmentList: [],
      hasPicture: false
    };
  }

  async componentDidMount() {
    const {match} = this.props;

    const user = match.params.username;
    const departmentList = await strapi.getEntries('departments');
    let userId = null;

    await strapi.axios.get(`${strapiURL}/users`,
      {
        params: {
          username:   user
        }
      }).then ((response) => {
      userId = response.data[0]._id;
    });

    const pic = await strapi.axios.get(`${strapiURL}/users/${userId}`);

    if(pic.data.ProfilePicture !== null) {
      const picURL = pic.data.ProfilePicture.url;
      this.setState({ProfilePicture: strapiURL + picURL});
    }
    else {
      this.setState({ProfilePicture: defaultProfileImage});
    }

    this.setState({departmentList, loading: false});

    const userObj = auth.getUser();
    if(userObj && userObj.username === match.params.username) {
      this.setState({
        editable: true
      });
    }

    const tempUser = await this.getLoggedInUser();
    this.setState({user: tempUser});
  }

  getLoggedInUser = async () => {
    const {match} = this.props;
    const url = `${strapiURL}/users`;

    return (await axios.get(url, {
      params: {
        username: match.params.username
      }
    })).data[0];
  };

  handleCapstoneClick = (capstoneName) => {
    history.push(`/ViewCapstone/${capstoneName}`);
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});

    if(name === 'Picture') {
      this.setState({hasPicture: true});
    }
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    const {user} = this.state;
    this.setState({
      open: true,
      // Persist state for making edits to individual posts
      oldBio: user.Bio,
      oldFullName: user.Fullname,
      Bio: user.Bio,
      Department: user.Department,
      Fullname: user.Fullname
    });
  };

  handleSubmit = async () => {
    const {Bio, Department, Fullname, hasPicture} = this.state;

    this.handleClose();
    const userId = auth.getUser()._id;
    const url = `${strapiURL}/users`;
    const authToken = `Bearer ${auth.getToken()}`;
    let newImageId = null;

    // Make the changes
    await strapi.axios.put(`${url}/${userId}`, {
      Bio,
      Department,
      Fullname
    }, {headers: {'Authorization': authToken}});

    if(hasPicture) {
      // Upload image and link it to profile
      const formData = new FormData();
      const image = document.getElementById('file-id');

      formData.append('files', image.files[0], image.files[0].name);

      await strapi.upload(formData, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': authToken}
      }).then( async (response) => {
        newImageId = response[0]._id;

        await strapi.axios.get(`${strapiURL}/userpictures?user=${userId}`).then(async (response2) => {
          if(response2.data.length === 0) {
            await strapi.axios.post(`${strapiURL}/userpictures`, {
              user: userId,
              ProfilePicture: newImageId
            },  {headers: {
              'Authorization': authToken
            }});
          }
          else {
            await strapi.axios.delete(`${strapiURL}/userpictures/${response2.data[0]._id}`, {headers:{
              'Authorization': authToken
            }}).catch(async () => {
              await strapi.axios.post(`${strapiURL}/userpictures`, {
                user: userId,
                ProfilePicture: newImageId
              },  {headers: {
                'Authorization': authToken
              }});
            });
          }
        });
      });
    }
  };

  render() {
    const {classes} = this.props;
    const {user, loading, ProfilePicture, editable, open, oldBio, Department, departmentList, oldFullName} = this.state;

    const userCapstones = [...user.createdcapstones];

    if (!loading) {
      const picArray = [ProfilePicture];
      return(
        <div>
          <Grid container layout='row' justify='center'>
            <Grid item xs={12} md={10}>
              {editable === true ?
                <h1><b>Your Profile</b></h1>
                : null
              }
              {editable === false ?
                <h1><b>User Profile</b></h1>
                : null
              }
              <Divider/>
            </Grid>
          </Grid>


          <Grid container layout='row' justify='center' spacing={24}>
            <Grid item xs={12} md={10}>
              <Card className={classes.card} style={{marginTop: '1%'}}>
                <CardContent>
                  <PageTitleTypography text={user.Fullname} align='left'/>
                  <Typography variant='subtitle1'>
                    Username: {user.username}
                  </Typography>
                  <Divider/>
                  <Grid item xs={12} md={10}>
                    {editable === true ?
                      <Button onClick={this.handleOpen} variant='outlined' color='primary' size='small' style={{marginTop: '1%'}}>
                        Edit Profile
                      </Button>
                      : null
                    }

                    <Dialog
                      open={open}
                      onClose={this.handleClose}
                    >
                      <DialogTitle id='edit-profile'>Edit Profile</DialogTitle>
                      <DialogContent>
                        <Typography>
                          <TextField
                            id='biography'
                            label='About Me'
                            multiline
                            rows='10'
                            margin='dense'
                            variant='outlined'
                            style={{width: 500}}
                            onChange={this.handleChange('Bio')}
                            defaultValue={oldBio}
                          />
                        </Typography>
                        <FormControl variant='outlined' className={classes.formMargin}>
                          <InputLabel>
                            Department
                          </InputLabel>
                          <Select
                            native
                            style={{width: 500}}
                            value={Department.name}
                            onChange={this.handleChange('Department')}
                            input={
                              <OutlinedInput
                                name='Department'
                                labelWidth={85}
                              />
                            }
                          >
                            <option value=''> </option>
                            {departmentList.map(dept => (
                              <option value={dept.name}>{dept.name}</option>
                            ))}
                          </Select>
                        </FormControl>
                        <Typography>
                          <TextField
                            id='fullname'
                            label='Full Name'
                            margin='dense'
                            variant='outlined'
                            style={{width: 500}}
                            onChange={this.handleChange('Fullname')}
                            defaultValue={oldFullName}
                          />
                        </Typography>
                        <Typography component='h1' align='center'>
                          Upload a file
                        </Typography>
                        <form>
                          <Typography align='center'>
                            Browse...
                            <input
                              type='file'
                              id='file-id'
                              name='file'
                              accept='image/*'
                              onChange={this.handleChange('Picture')}
                            />
                          </Typography>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Fab variant='extended' onClick={this.handleSubmit} color='primary'>
                          Update
                        </Fab>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div>
            <Grid container layout='row' justify='center' spacing={24}>
              <Grid item xs={12} md={2}>
                <Card className={classes.card} style={{paddingBottom: '12px', height: '100%'}}>
                  <CardHeader
                    title='Profile Picture'
                  />
                  <Divider/>
                  <Grid container justify='center'>
                    {
                      picArray.map((result) => (
                        <img
                          src={result} alt='profile'
                          style={{borderRadius: '12px',
                            marginTop: '12px', width: '500px', height: '230px'}}
                        />

                      ))}
                  </Grid>

                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card className={classes.card} style={{height: '100%'}}>
                  <CardHeader
                    title='Profile Details'
                  />
                  <Divider/>
                  <div style={{paddingLeft: '16px', paddingTop: '8px'}}>
                    <Typography variant='subtitle1' color='textPrimary'>
                      <b>Full Name:<br/></b>
                      {user.Fullname}
                    </Typography>
                  </div>
                  <div style={{paddingLeft: '16px', paddingTop: '8px'}}>
                    <Typography variant='subtitle1' color='textPrimary'>
                      <b>Email:<br/></b>
                      {user.email}
                    </Typography>
                  </div>
                  <div style={{paddingLeft: '16px', paddingTop: '8px'}}>
                    <Typography variant='subtitle1' color='textPrimary'>
                      <b>Department:<br/></b>
                      {user.Department}
                    </Typography>
                  </div>
                  <br/>
                  <div style={{paddingLeft: '16px', paddingTop: '16px'}}>
                    <Typography variant='subtitle1' color='textPrimary'>
                      <b>About Me:<br/></b>
                      {user.Bio}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div>
            <Grid container justify='center' spacing={24}>
              <Grid item xs={12} md={10}>
                <Card>
                  <CardHeader
                    title='Associated Capstones'
                  />
                  <Divider/>
                  <br/>
                </Card>
              </Grid>
            </Grid>
          </div>
          <Grid container justify='center'>
            <Grid item xs={12} md={10}>
              <Grid container spacing={8}>
                {userCapstones.map((result) => (
                  <Grid item xs={12} md={6} style={{marginTop: '1%'}}>
                    <Card className={classes.associatedCard} onClick={() => this.handleCapstoneClick(result._id)}>
                      <CardContent>
                        <SubHeadingTextTypography text={result.CapstoneName}/>
                        <Divider/>
                        <Markdown>
                          {result.Description}
                        </Markdown>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

ViewUser.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ViewUser);
