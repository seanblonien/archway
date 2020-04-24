import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Can from '../Components/Can';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import GridPaper from '../Components/LayoutWrappers/GridPaper';
import CancelSubmit from '../Components/Profile/CancelSubmit';
import EditButton from '../Components/Profile/EditButton';
import MainProfile from '../Components/Profile/MainProfile';
import MainProfileEdit from '../Components/Profile/MainProfileEdit';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfilePic from '../Components/Profile/ProfilePic';
import SponsorProfile from '../Components/Profile/SponsorProfile';
import SponsorProfileEdit from '../Components/Profile/SponsorProfileEdit';
import {permissions} from '../constants';
import AuthContext from '../Contexts/AuthContext';
import api from '../Services/api';
import {snack} from '../utils/Snackbar';

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
    const {setUser} = this.context;
    event.preventDefault();

    try{
      const response = await api.users.update(profile.id, profile);
      setUser(response.data);
      this.setState({editing: false, unchangedProfile: profile});
      enqueueSnackbar('Your changes have been saved.', snack.success);
    } catch(e){
      enqueueSnackbar(e, snack.error);
    }
  };

  render() {
    const {editing, profile} = this.state;
    const {match} = this.props;
    const {user, isAuthenticated} = this.context;

    // The logged in (authenticated) user can only edit their own profile
    const canEdit = isAuthenticated && profile && user.username === profile.username;

    return (
      profile ?
        <GridPageContainer>
          <GridPaper>
            <ProfileHeader user={profile} edit={editing}/>
            <Divider/>
            <ProfilePic user={profile} username={match.params.username} picture={this.updatePicture} canEdit={canEdit}/>
          </GridPaper>

          {(editing) ?
            <>
              {/* It is assumed that if you can get here, that you are editing your own profile, and you have permission to do so */}
              <GridPaper>
                <MainProfileEdit user={profile} update={this.updateProfile}/>
              </GridPaper>
              <Can perform={permissions.application.proposals.create} role={profile.role.name}>
                <GridPaper>
                  <SponsorProfileEdit user={profile} update={this.updateProfile}/>
                </GridPaper>
              </Can>
              <CancelSubmit cancel={this.handleCancel} submit={this.handleSubmit}/>
            </>
            :
            <>
              <GridPaper>
                <MainProfile user={profile}/>
              </GridPaper>
              <Can perform={permissions.application.proposals.create} role={profile.role.name}>
                <GridPaper>
                  <SponsorProfile user={profile}/>
                </GridPaper>
              </Can>
            </>
          }

          <Can perform={permissions.users_permissions.user.update}>
            <>
              {canEdit && <EditButton edit={this.handleEdit}/>}
            </>
          </Can>
        </GridPageContainer>
        :
        <GridPageContainer>
          <GridPaper>
            <Typography variant='h4'>
              Sorry, we could not find the profile you were looking for...
            </Typography>
          </GridPaper>
        </GridPageContainer>
    );
  }
}

ViewProfile.contextType = AuthContext;

ViewProfile.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(ViewProfile);
