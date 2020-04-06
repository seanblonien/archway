import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import React, {Component} from 'react';
import api from '../Services/api';
import Message from '../Components/Message';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePic from '../Components/Profile/ProfilePic';
import MainProfile from '../Components/Profile/MainProfile';
import MainProfileEdit from '../Components/Profile/MainProfileEdit';
import SponsorProfile from '../Components/Profile/SponsorProfile';
import SponsorProfileEdit from '../Components/Profile/SponsorProfileEdit';
import CancelSubmit from '../Components/Profile/CancelSubmit';
import EditButton from '../Components/Profile/EditButton';
import AuthContext from '../Contexts/AuthContext';

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

    // Get the profile's profile picture
    this.setState({profile});
    this.setState({unchangedProfile});
  }

  updateMessage = (msg) => {
    // Triggers a message to be shown
    this.setState({message: msg});
    this.setState({messageOpen: true});
  }

  updateMessageOpen = (open) => {
    // Reset error message
    this.setState({message: ''});
    this.setState({messageOpen: open});
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

  handleCancel = () => {
    const {unchangedProfile} = this.state;
    this.setState({editing: false});
    this.setState({profile: unchangedProfile});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleSubmit = async (event) => {
    // TODO: Only the logged in profile should be able to edit their profile
    const {profile} = this.state;

    try{
      await api.users.update(profile.id, profile);
      this.setState({editing: false});
      this.setState({unchangedProfile: profile});
    } catch(e){
      this.setState({message: e, messageOpen: true});
    }
    event.preventDefault();
  };

  render() {
    const {editing, profile, message, messageOpen} = this.state;
    const {match} = this.props;
    const {user, isAuthenticated} = this.context;
    const canEdit = isAuthenticated && user.username === profile.username;

    return (
      <Box width='50%' mx='auto'>
        {messageOpen && <Message title='Something went wrong...' message={message} callback={this.updateMessageOpen}/>}
        <ProfileHeader user={profile} edit={editing}/>
        <Divider/>
        <ProfilePic user={profile} username={match.params.username} picture={this.updatePicture} message={this.updateMessage} canEdit={canEdit}/>
        <Divider/>
        {(editing) ?
          (
            <div>
              <MainProfileEdit user={profile} update={this.updateProfile}/>
              <SponsorProfileEdit user={profile} update={this.updateProfile}/>
              <CancelSubmit cancel={this.handleCancel} submit={this.handleSubmit}/>
            </div>
          ) : 
          (
            <div>
              <MainProfile user={profile}/>
              <SponsorProfile user={profile}/>
              <EditButton edit={this.handleEdit} canEdit={canEdit}/>
            </div>
          )
        }
      </Box>
    );
  }
}

ViewProfile.contextType = AuthContext;

export default ViewProfile;
