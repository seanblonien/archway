import {Box} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {Parallax} from 'react-parallax';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import api from '../Services/api';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import LoadingCircle from '../Components/LoadingCircle';
import Team from '../Components/Team';
import CapstonePhotos from '../Components/CapstonePhotos';
import {convertStrapiDate, imageURL} from '../utils/utils';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';

const styles = () => ({
  cover: {
    height: '500px',
    backgroundPosition: '0% 0%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
  }
});

class ViewCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstone: {},
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const capstone = await api.capstones.findOne(match.params.capstoneID);
    this.setState({loading: false, capstone});
  };

  getSponsors = () => {
    const {capstone} = this.state;
    return capstone.sponsors.map((sponsor) => sponsor.name);
  }

  handleSponsorClick = (sponsorName) => {
    history.push(routes.viewsponsor.genPath(sponsorName));
  };

  render() {
    const {classes} = this.props;
    const {loading, capstone} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <Parallax bgImage={imageURL.cover(capstone.cover)} strength={300}>
          <div className={classes.cover}/>
        </Parallax>
        <Grid container direction='row' justify='flex-start' alignItems='flex-start' component={Box} px={6} py={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Typography className={classes.title} variant='h3'>{capstone.name}</Typography>
            <Typography variant='h6'>
              <strong>Start Date:</strong> {convertStrapiDate(capstone.startDate).toDateString()}
            </Typography>
            <Typography variant='h6'>
              <strong>End Date:</strong> {convertStrapiDate(capstone.endDate).toDateString()}
            </Typography>
            <Typography variant='h6'>
              <strong>Sponsor(s):</strong> {this.getSponsors().join(', ') || 'None'}
            </Typography>
            {capstone.sponsors[0] && <Grid item>
              <GridList cellHeight={120} cols={1}>
                <GridListTile
                  style={{maxWidth: '320px'}}
                  key={capstone.sponsors[0].logo.url}
                  onClick={() => this.handleSponsorClick(capstone.sponsors[0].id)}
                >
                  <img
                    src={imageURL.sponsor(capstone.sponsors[0].logo)}
                    alt='Sponsor' style={{height: '100%', width: '100%'}}
                  />
                </GridListTile>
              </GridList>
            </Grid>}
            <br/>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={6} component={Box} mt={1}>
            <MediaMarkdown>{capstone.description}</MediaMarkdown>
            <br/>
          </Grid>
          {capstone.members[0] &&
            <Grid item xs={12} component={Team} capstone={capstone}/>
          }
          {capstone.media[0] &&
            <Grid item xs={12} component={CapstonePhotos} capstone={capstone}/>
          }
        </Grid>
      </div>
    ;
  }
}

export default compose(
  withStyles(styles),
  withWidth(),
)(ViewCapstone);

