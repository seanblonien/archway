/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
import {Dialog, Divider} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import _ from 'lodash';
import Markdown from 'markdown-to-jsx';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import auth from '../Auth';
import LoadingCircle from '../Components/LoadingCircle';
import PageTitleTypography from '../Components/PageTitleTypography';
import SubHeadingTextTypography from '../Components/SubHeadingTextTypography';

const styles = () => ({
  card: {
    raised: true,
    marginTop: '1%',
  },
  leftColCard: {
    marginRight: '2%',
    marginTop: '1%',
  },
  bottomCard:{
    marginTop: '1%',
    marginBottom: '2%',
  },
  capstoneImage: {
    height: 'auto',
    maxWidth: '100%',
    marginTop: '2%',
    borderRadius: '5px',
  },
  textContainer: {
    position: 'relative',
    height: '200px',
    width: '200px',
    marginBottom: '2%',
    background: '#f1f1f1',
    borderRadius: '5px',
  },
  textBox: {
    position: 'absolute',
    bottom: '0',
    color: '#f1f1f1',
    background: 'rgb(0,0,0, 0.5)',
    width: '100%',
    padding: '10px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },
  titleText: {
    variant: 'h1',
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
  },
  cards: {
    backgroundColor: '#006400'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  photoGalleryGridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});

class ViewCapstone extends Component {
  // Takes ugly JSON date and returns readable date
  static formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toUTCString().split(' ').slice(0, 4).join(' ');
  }

  // Calcs how many columns of users should be shown for team pictures
  static getColumnsForTeamPics(props) {
    if(props.width === 'xl') {
      return 4;
    }if(props.width === 'lg') {
      return 4;
    }if(props.width ==='md') {
      return 6;
    }if(props.width ==='sm') {
      return 6;
    }
    return 12;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
      userOpen: false,
      newUser: '',
      Username: '',
      photoOpen: false,
      capstone: '',
      team: [],
      teamPics: []
    };
  }

  async componentDidMount() {
    const users1 = await api.users.find();

    // If we're logged-in, store the user Id and update the count values.
    const userObj = auth.getUser();
    if (userObj) {
      this.setState({Username: userObj._id});
    }

    const capstone = await this.getCapstone();
    this.setState({capstone, team: capstone.members});
    await this.getTeamPics();
    this.setState({loading: false, users: users1});
  };

  getCapstone = async () =>{
    const {match} = this.props;
    return api.capstones.findOne(match.params.capstoneID);
  };

  getTeamPics = async () => {
    const {team} = this.state;
    const picURLS = [];
    for(const member in team) {
      const response = await api.users.findOne(team[member].id);
      picURLS[member] = imageURL.user(response.picture);
    }
    this.setState({teamPics: picURLS});
  };

  // Ensures margin is there when screen is large and dissapears when screen resizes to below md and col resizes
  setLeftColClass(props) {
    const {classes} = this.props;
    if(props.width === 'xl') {
      return classes.leftColCard;
    }if(props.width === 'lg') {
      return classes.leftColCard;
    }if(props.width ==='md') {
      return classes.leftColCard;
    }if(props.width ==='sm') {
      return classes.card;
    }
    return classes.card;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handlePhotoClickOpen = () =>{
    this.setState({photoOpen: true});
  };

  handlePhotoClose = () =>{
    this.setState({photoOpen: false});
  };

  handleUserClickOpen = () =>{
    this.setState({userOpen: true});
  };

  handleUserClose = () =>{
    this.setState({userOpen: false});
  };

  handleUserSubmit = async (capstoneId, members) => {
    const {users, newUser} = this.state;

    this.setState({userOpen: false});
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.toUpperCase() === newUser.toUpperCase()) {
        members.push(users[i]._id);
        break;
      }
    }

    await api.capstones.update(capstoneId, {members});
  };

  isCreator = (obj) => {
    const {members} = obj;
    const {Username} = this.state;

    return !_.isEmpty(members.filter(c => c._id === Username));
  };

  render() {
    const {classes} = this.props;
    const {capstone, userOpen, photoOpen, team, teamPics, loading} = this.state;

    if (!loading) {
      const picArray = [];
      for (const pic in capstone.Pictures) {
        picArray.push(imageURL.capstone(capstone.Pictures[pic]));
      }

      const creatorArray = [];
      const picCreatorArray = [];

      for(const i in team) {
        creatorArray.push(team[i]);
        picCreatorArray.push(teamPics[i]);
      }

      return <div>
        <Grid container justify='center'>
          <Grid item xs={10}>

            <Card className={classes.card}>
              <CardContent>

                <Grid container alignItems='center'>

                  { /* Facebook/Twitter buttons */}

                  <FacebookShareButton
                    url='www.baylor.edu'
                    quote={capstone.title}
                    hashtag='Capstone'
                  >
                    <FacebookIcon
                      size={28}
                      round
                    />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url='www.baylor.edu'
                    title={capstone.title}
                    hashtags={['Capstone']}
                  >
                    <TwitterIcon
                      size={28}
                      round
                    />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url='www.baylor.edu'
                    title={capstone.title}
                    description={capstone.description}
                  >
                    <LinkedinIcon
                      size={28}
                      round
                    />
                  </LinkedinShareButton>
                </Grid>

                {/* Title, Capstone Image, Start/End Date */}
                <PageTitleTypography text={capstone.title}/>

                <Divider/>
                <Typography align='center' style={{marginBottom: '1%'}}>
                  <img src={imageURL.capstone(capstone.coverPhoto)} className={classes.capstoneImage} alt='Display'/>
                </Typography>
              </CardContent>
            </Card>
            <div>
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <Card className={this.setLeftColClass(this.props)}>
                    <CardContent>
                      <SubHeadingTextTypography text='Project Info' align='center'/>
                      <Divider/>
                      <Typography variant='subheading' style={{marginTop: '2%'}}>
                        <b>Start Date:</b> {ViewCapstone.formatDate(capstone.startDate)}
                      </Typography>
                      <Typography variant='subheading'>
                        <b>Date Completed:</b> {ViewCapstone.formatDate(capstone.endDate)}
                      </Typography>
                      <Typography variant='subheading' style={{marginTop: '2%'}}>
                        <b>Department: </b> {capstone.department.name}
                      </Typography>
                      <Typography variant='subheading'>
                        <div>
                          <b>Sponsors:</b>
                          {capstone.sponsors.map((result) => (
                            <div>{result.name}</div>
                          ))}
                        </div>
                      </Typography>
                      <Typography variant='subheading' style={{marginTop: '2%'}}>
                        <b>Description: </b> <br/>
                        <Markdown>
                          {capstone.description}
                        </Markdown>
                      </Typography>
                    </CardContent>
                  </Card>


                  <Card className={this.setLeftColClass(this.props)}>
                    {picArray.length > 0 &&
                      <CardContent>
                        <SubHeadingTextTypography text='Photo Gallery' align='center'/>

                        { /* Add A New Photo */}

                        {this.isCreator(capstone) &&
                          <div align='center'>
                            <Button onClick={this.handlePhotoClickOpen}>
                              <Typography color='primary' variant='h6' component='span'>
                                Add Photo
                              </Typography>
                            </Button>
                            <Dialog
                              open={photoOpen}
                              onClose={this.handleUserClose}
                            >
                              <DialogTitle>Add New Photo</DialogTitle>
                              <DialogContent>
                                <form>
                                  <Typography>
                                    <input
                                      type='file'
                                      id='file-id2'
                                      name='file'
                                      accept='image/*'
                                      onChange={this.handleChange('newPhoto')}
                                    />
                                  </Typography>
                                </form>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={this.handlePhotoClose} color='primary'>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => this.handlePhotoSubmit(capstone._id, capstone.members)}
                                  color='primary'
                                >
                                  Submit
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        }

                        <Divider/>
                        <br/>
                        <div className={classes.gridListContainer}>
                          <Carousel showArrows showThumbs={false} infiniteLoop>
                            {picArray.map((result, i) =>
                              <img
                                height={300} width={300} alt='post'
                                src={result}
                                key={i}
                              />)
                            }
                          </Carousel>
                        </div>
                      </CardContent>}
                    {picArray.length === 0 &&
                      <CardContent>
                        <SubHeadingTextTypography text='Photos Coming Soon' align='center'/>
                        {this.isCreator(capstone) &&
                          <div align='center'>
                            <Button onClick={this.handlePhotoClickOpen}>
                              <Typography color='primary' variant='h6' component='span'>
                                Add Photo
                              </Typography>
                            </Button>
                            <Dialog
                              open={photoOpen}
                              onClose={this.handleUserClose}
                            >
                              <DialogTitle>Add New Photo</DialogTitle>
                              <DialogContent>
                                <form>
                                  <Typography>
                                    <input
                                      type='file'
                                      id='file-id2'
                                      name='file'
                                      accept='image/*'
                                      onChange={this.handleChange('newPhoto')}
                                    />
                                  </Typography>
                                </form>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={this.handlePhotoClose} color='primary'>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => this.handlePhotoSubmit(capstone._id, capstone.members)}
                                  color='primary'
                                >
                                  Submit
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        }
                      </CardContent>}
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Card className={classes.card}>
                    <CardContent>
                      <SubHeadingTextTypography text='The Team' align='center'/>

                      { /* Add a user */}

                      {this.isCreator(capstone) &&
                        <div align='center'>
                          <Button onClick={this.handleUserClickOpen}>
                            <Typography color='primary' variant='h6' component='span'>
                              Add Members
                            </Typography>
                          </Button>
                          <Dialog
                            open={userOpen}
                            onClose={this.handleUserClose}
                          >
                            <DialogTitle>Add Team Member</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                To add a new group member, type their username here.
                                Group members must be registered on the site to be added
                                to capstones.
                              </DialogContentText>
                              <TextField
                                margin='dense'
                                id='name'
                                label='Username'
                                type='text'
                                onChange={this.handleChange('newUser')}
                                fullWidth
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={this.handleUserClose} color='primary'>
                                Cancel
                              </Button>
                              <Button
                                onClick={() => this.handleUserSubmit(capstone._id, capstone.members)}
                                color='primary'
                              >
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      }
                      { /* Code for showing members} */}

                      <Divider/>

                      {creatorArray.length > 0 && <Grid container style={{marginTop: '2%'}}>
                        {creatorArray.map((result, i) => (
                          <Grid item xs={ViewCapstone.getColumnsForTeamPics(this.props)} key={result.username}>
                            <div className={classes.textContainer}>
                              <Button
                                component={Link}
                                to={`/ViewProfile/${result.username}`}
                                style={{height: '100%', width: '100%'}}
                              >
                                <img src={picCreatorArray[i]} alt={result.username} width='100%' height='auto' style={{borderRadius: '5px', display: 'block'}}/>
                                <div className={classes.textBox}>
                                  {result.username}
                                </div>
                              </Button>
                            </div>
                          </Grid>
                        ))}

                      </Grid>}

                      {creatorArray.length === 0 &&
                        <Grid container style={{marginTop: '2%'}}>
                          <Grid item xs={ViewCapstone.getColumnsForTeamPics(this.props)}>
                            Coming Soon
                          </Grid>
                        </Grid>
                      }

                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>;
    }
    return <LoadingCircle/>;
  }
}

export default compose(
  withStyles(styles),
  withWidth(),
)(ViewCapstone);

