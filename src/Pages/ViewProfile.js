import {withSnackbar} from 'notistack';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePic from '../Components/Profile/ProfilePic';
import MainProfile from '../Components/Profile/MainProfile';
import MainProfileEdit from '../Components/Profile/MainProfileEdit';
import SponsorProfile from '../Components/Profile/SponsorProfile';
import SponsorProfileEdit from '../Components/Profile/SponsorProfileEdit';
import CancelSubmit from '../Components/Profile/CancelSubmit';
import EditButton from '../Components/Profile/EditButton';
import AuthContext from '../Contexts/AuthContext';
import {permissions} from '../constants';
import Can from '../Components/Can';
import {snack} from '../utils/Snackbar';

const styles = (theme) => ({
  profilePaper:{
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    outline: 'none',
  },
});

const initialState = {
  id: '',
  username: '',
  email: '',
  Fullname: '',
  picture: {},
  sponsorOrganization: {name: ''},
  role: {name: ''},
  description: '',
  jobTitle: '',
};

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      profile: initialState,
      unchangedProfile: initialState,
    };
  }

  async componentDidMount() {
    const {match} = this.props;

    // Get the data for the profile in question
    const response = await api.users.find({username: match.params.username});
    const profile = response[0];
    const unchangedProfile = response[0];

    this.setState({profile, unchangedProfile});
  }

  updatePicture = (pic) => {
    // Update the picture on the screen
    const {profile, unchangedProfile} = this.state;
    this.setState({profile: {...profile, picture: pic}, unchangedProfile: {...unchangedProfile, picture: pic}});
  }

  updateProfile = (name, value) => {
    const {profile} = this.state;
    this.setState({profile: {...profile, [name]: value}});
  }

  handleCancel = () => {
    const {unchangedProfile} = this.state;
    this.setState({editing: false, profile: unchangedProfile});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleSubmit = async (event) => {
    const {profile} = this.state;
    const {enqueueSnackbar} = this.props;

    try{
      await api.users.update(profile.id, profile);
      this.setState({editing: false, unchangedProfile: profile});
      enqueueSnackbar('Your changes have been saved.', snack.success);
    } catch(e){
      enqueueSnackbar(e, snack.error);
    }
    event.preventDefault();
  };

  render() {
    const {editing, profile} = this.state;
    const {match, classes} = this.props;
    const {user, isAuthenticated} = this.context;

    // The logged in (authenticated) user can only edit their own profile
    const canEdit = isAuthenticated && profile && user.username === profile.username;

    return (
      <div>
        {profile ?
          <Box width='60%' mx='auto' my={2}>
            <Paper className={classes.profilePaper}>
              <ProfileHeader user={profile} edit={editing}/>
              <Divider/>
              <ProfilePic user={profile} username={match.params.username} picture={this.updatePicture} canEdit={canEdit}/>
            </Paper>
            <br/>
            {(editing) ?
              (
                // It is assumed that if you can get here, that you are editing your own profile, and you have permisison to do so
                <div>
                  <Paper className={classes.profilePaper}>
                    <MainProfileEdit user={profile} update={this.updateProfile}/>
                  </Paper>
                  <Can perform={permissions.application.proposals.create}>
                    <br/>
                    <Paper className={classes.profilePaper}>
                      <SponsorProfileEdit user={profile} update={this.updateProfile}/>
                    </Paper>
                  </Can>
                  <CancelSubmit cancel={this.handleCancel} submit={this.handleSubmit}/>
                </div>
              ) :
              (
                <div>
                  <Paper className={classes.profilePaper}>
                    <MainProfile user={profile}/>
                  </Paper>
                  <Can perform={permissions.application.proposals.create} role={profile.role.name}>
                    <br/>
                    <Paper className={classes.profilePaper}>
                      <SponsorProfile user={profile}/>
                    </Paper>
                  </Can>
                  <Can perform={permissions.users_permissions.user.update}>
                    <div>
                      {canEdit && <EditButton edit={this.handleEdit}/>}
                    </div>
                  </Can>
                </div>
              )
            }
          </Box>
          :
          <Box width='50%' mx='auto' my={12}>
            <Typography variant='h3'>Sorry, we could not find the profile you were looking for...</Typography>
          </Box>
        }
      </div>
    );
  }
}

ViewProfile.contextType = AuthContext;

ViewProfile.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(styles) (ViewProfile));
