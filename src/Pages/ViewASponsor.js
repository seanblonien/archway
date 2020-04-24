import {Link} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import {withSnackbar} from 'notistack';
import LoadingCircle from '../Components/LoadingCircle';
import SponsorForm from '../Components/SponsorForm';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import CapstonesTab from '../Components/CapstonesTab';
import Cover from '../Components/Cover';
import api from '../Services/api';
import {imageURL} from '../utils/utils';
import {permissions} from '../constants';
import Can from '../Components/Can';
import AuthContext from '../Contexts/AuthContext';

class ViewASponsor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sponsor: [],
      canEdit: false,
      logoPhoto: '',
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
      logoPhoto: imageURL.sponsor(updatedSponsor.logo)
    });
  };

  render() {
    const {loading, sponsor, canEdit, logoPhoto} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <Cover covers={sponsor.cover}>
          <Grid container direction='row' justify='flex-end'>
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
          </Grid>
        </Cover>
        <Grid container direction='column'>
          <Grid item container direction='row' justify='space-evenly' style={{marginTop: '2%'}}>
            <Grid item md={6}>
              <MediaMarkdown>{sponsor.description}</MediaMarkdown>
            </Grid>
            <Grid item md={4} align='center'>
              <img src={logoPhoto} alt={sponsor.name} style={{maxWidth: '400px'}}/>
              <Link item href={sponsor.url}>
                <Button style={{marginTop: '5%', border: '2px solid'}}>
                  <Typography>Visit {sponsor.name} Website</Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid item container direction='row' justify='space-around' style={{marginTop: '4%'}}>
            <Grid item xs={11}>
              {sponsor.capstones[0] && <CapstonesTab capstones={sponsor.capstones}/>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    ;
  }
}

ViewASponsor.contextType = AuthContext;

export default withSnackbar(((withWidth()(ViewASponsor))));
