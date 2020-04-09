import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
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


class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      profile: {
        id: '',
        username: '',
        email: '',
        Fullname: '',
        picture: '',
        sponsorOrganization: '',
        role: '',
        description: '',
        jobTitle: '',
      },
      unchangedProfile: {
        id: '',
        username: '',
        email: '',
        Fullname: '',
        picture: '',
        sponsorOrganization: '',
        role: '',
        description: '',
        jobTitle: '',
      },
      message: '',
      messageOpen: false,
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

  updateMessage = (msg) => {
    // Triggers a message to be shown
    this.setState({message: msg, messageOpen: true});
  }

  updatePicture = (pic) => {
    // Update the picture on the screen
    const {profile} = this.state;
    this.setState({profile: {...profile, picture: pic}});
  }

  updateProfile = (name, value) => {
    const {profile} = this.state;
    this.setState({profile: {...profile, [name]: value}});
  }

  handleMessageClose = () => {
    // Reset error message
    this.setState({message: '', messageOpen: false});
  };

  handleCancel = () => {
    const {unchangedProfile} = this.state;
    this.setState({editing: false, profile: unchangedProfile});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleSubmit = async (event) => {
    const {profile} = this.state;

    try{
      await api.users.update(profile.id, profile);
      this.setState({editing: false, unchangedProfile: profile});
    } catch(e){
      this.setState({message: e, messageOpen: true});
    }
    event.preventDefault();
  };

  render() {
    const {editing, profile, message, messageOpen} = this.state;
    const {match} = this.props;
    const {user, isAuthenticated} = this.context;

    // The logged in (authenticated) user can only edit their own profile
    const canEdit = isAuthenticated && user.username === profile.username;

    return (
      <div>
        {profile ?
          <Box width='50%' mx='auto'>
            <Snackbar open={messageOpen} autoHideDuration={6000} onClose={this.handleClose}>
              <Alert severity='error'>{message}</Alert>
            </Snackbar>
            <ProfileHeader user={profile} edit={editing}/>
            <Divider/>
            <ProfilePic user={profile} username={match.params.username} picture={this.updatePicture} message={this.updateMessage} canEdit={canEdit}/>
            <Divider/>
            {(editing) ?
              (
                // It is assumed that if you can get here, that you are editing your own profile, and you have permisison to do so
                <div>
                  <MainProfileEdit user={profile} update={this.updateProfile}/>
                  <Can perform={permissions.application.proposals.create}>
                    <SponsorProfileEdit user={profile} update={this.updateProfile}/>
                  </Can>
                  <CancelSubmit cancel={this.handleCancel} submit={this.handleSubmit}/>
                </div>
              ) : 
              (
                <div>
                  <MainProfile user={profile}/>
                  <Can perform={permissions.application.proposals.create} role={profile.role.name}>
                    <SponsorProfile user={profile}/>
                  </Can>
                  <Can perform={permissions.users_permissions.user.update}>
                    {canEdit && <EditButton edit={this.handleEdit}/>}
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

export default ViewProfile;
