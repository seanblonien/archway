import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import api from '../Services/api';
import history from '../utils/history';
import Can from './Can';
import LoadingCircle from './LoadingCircle';
import {permissions} from '../constants';
import {imageURL} from '../utils/utils';

class FeaturedSponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      featuredSponsors: [],
    };
  }

  async componentDidMount() {
    const sponsors = await api.sponsors.find();
    const featuredSponsors = sponsors.filter(sponsor => sponsor.isFeatured);
    this.setState({loading: false, featuredSponsors});
  }

  handleSponsorClick = (sponsorName) => {
    history.push(`/ViewASponsor/${sponsorName}`);
  };

  render () {
    const {loading, featuredSponsors} = this.state;

    return loading ?
      <LoadingCircle/>
      :
      <Can perform={permissions.application.sponsors.find}>
        <Grid container direction='column' justify='center' alignItems='center' style={{marginTop: '1.5%'}}>
          <Grid container direction='column' item xs={12} md={8}  justify='center' alignItems='center'>
            <Typography align='center' variant='h4'>Sponsors</Typography>
          </Grid>
          <Grid item xs={12} alignItems='center'>
            <GridList cellHeight={100} cols={2}>
              {featuredSponsors.map((result, i) => (
                <GridListTile
                  style={{maxWidth: '200px'}}
                  key={featuredSponsors[i].logo.url}
                  onClick={() => this.handleSponsorClick(result.id)}
                >
                  <img
                    src={imageURL.sponsor(featuredSponsors[i].logo)}
                    alt='Sponsor' style={{height: '100%', width: '100%'}}
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
      </Can>
    ;
  }
}

export default FeaturedSponsors;
