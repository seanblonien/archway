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
      user: {
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
      unchangedUser: {
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

    // Get the data for the user in question
    const response = await api.users.find({username: match.params.username});
    const user = response[0];
    const unchangedUser = response[0];

    // Get the user's profile picture
    this.setState({user});
    this.setState({unchangedUser});
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
    const {user} = this.state;
    this.setState({user: {...user, picture: pic}});
  }

  updateUser = (name, value) => {
    const {user} = this.state;
    this.setState({user: {...user, [name]: value}});
  }

  handleCancel = () => {
    const {unchangedUser} = this.state;
    this.setState({editing: false});
    this.setState({user: unchangedUser});
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleSubmit = async (event) => {
    // TODO: Only the logged in user should be able to edit their profile
    const {user} = this.state;

    try{
      await api.users.update(user.id, user);
      this.setState({editing: false});
      this.setState({unchangedUser: user});
    } catch(e){
      this.setState({message: e, messageOpen: true});
    }
    event.preventDefault();
  };

  render() {
    const {editing, user, message, messageOpen} = this.state;
    const {match} = this.props;
    const {isAuthenticated} = this.context;

    return (
      <Box width='50%' mx='auto'>
        {messageOpen && <Message title='Something went wrong...' message={message} callback={this.updateMessageOpen}/>}
        <ProfileHeader user={user} edit={editing}/>
        <Divider/>
        <ProfilePic user={user} username={match.params.username} picture={this.updatePicture} message={this.updateMessage}/>
        <Divider/>
        {(editing) ?
          (
            <div>
              <MainProfileEdit user={user} update={this.updateUser}/>
              <SponsorProfileEdit user={user} update={this.updateUser}/>
              <CancelSubmit cancel={this.handleCancel} submit={this.handleSubmit}/>
            </div>
          ) : 
          (
            <div>
              <MainProfile user={user}/>
              <SponsorProfile user={user}/>
              {(isAuthenticated) && <EditButton edit={this.handleEdit}/>}
            </div>
          )
        }
      </Box>
    );
  }
}

ViewProfile.contextType = AuthContext;

export default ViewProfile;
