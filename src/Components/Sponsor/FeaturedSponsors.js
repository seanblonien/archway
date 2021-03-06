import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {permissions} from '../../constants';
import api from '../../Services/api';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import {imageURL} from '../../utils/utils';
import Can from '../Can';
import LoadingCircle from '../LoadingCircle';

const styles = () => ({
  pointer:{
    cursor: 'pointer'
  }
});

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
    history.push(routes.viewsponsor.genPath(sponsorName));
  };

  render () {
    const {classes} = this.props;
    const {loading, featuredSponsors} = this.state;

    return loading ?
      <LoadingCircle/>
      :
      <Can perform={permissions.application.sponsors.find}>
        <Grid container direction='column' justify='center' alignItems='center' style={{marginTop: '1.5%'}}>
          <Grid container direction='column' item xs={12} md={8}  justify='center' alignItems='center'>
            <Typography align='center' variant='h4'>Sponsors</Typography>
          </Grid>
          <Grid item xs={12} container justify='center' alignItems='center'>
            <GridList cellHeight={100} cols={2}>
              {featuredSponsors.map((result, i) => (
                <GridListTile
                  style={{maxWidth: '200px'}}
                  key={featuredSponsors[i].logo.url}
                  onClick={() => this.handleSponsorClick(result.id)}
                  className={classes.pointer}
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

export default withStyles(styles) (FeaturedSponsors);
