import {Link} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import {withSnackbar} from 'notistack';
import LoadingCircle from '../Components/LoadingCircle';
import SponsorForm from '../Components/SponsorForm';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import api from '../Services/api';
import {imageURL} from '../utils/utils';
import {permissions} from '../constants';
import Can from '../Components/Can';
import AuthContext from '../Contexts/AuthContext';

const styles = () => ({

});

class ViewASponsor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sponsor: [],
      canEdit: false,
      logoPhoto: '',
      coverPhoto: ''
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const sponsor = await api.sponsors.findOne(match.params.id);
    const {user} = this.context;
    this.setState({
      loading: false,
      sponsor,
      logoPhoto: imageURL.sponsor(sponsor.logo),
      coverPhoto: imageURL.sponsor(sponsor.coverPhoto)
    });

    for (const person of sponsor.personnel) {
      if (person.id === user.id) {
        this.setState({canEdit: true});
      }
    }
  }

  updateData = async () => {
    const {sponsor} = this.state;
    const updatedSponsor = await api.sponsors.findOne(sponsor.id);
    this.setState({
      sponsor: updatedSponsor,
      coverPhoto: imageURL.sponsor(updatedSponsor.coverPhoto),
      logoPhoto: imageURL.sponsor(updatedSponsor.logo)
    });
  };

  render() {
    const {classes} = this.props;
    const {loading, sponsor, canEdit, logoPhoto, coverPhoto} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        {canEdit &&
          <Can perform={permissions.application.sponsors.update}>
            <SponsorForm
              title='Edit Sponsor'
              sponsor={sponsor}
              type='edit'
              update={this.updateData}
            />
          </Can>
        }
      </div>
    ;
  }
}

ViewASponsor.contextType = AuthContext;

export default withSnackbar((withStyles(styles)(withWidth()(ViewASponsor))));
