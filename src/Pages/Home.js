import {Box, Button, Link, Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import React, {Component} from 'react';
import {Parallax} from 'react-parallax';
import {Link as RouterLink} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle';
import {
  schoolColorPrimary,
  schoolColorSecondary,
  strapi,
  strapiURL,
  university
} from '../constants';
import history from '../utils/history';

const insideStyles = {
  background: schoolColorPrimary,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  borderRadius: '10px',
  textAlign: 'center',
  fontSize: '250%',
  height: '500px',
  width: '350px',
  paddingTop: 10,
  paddingBottom: 50,
};
const surroundStyle = {
  background: 'rgb(0,0,0,0.75)',
  paddingLeft: 20,
  paddingRight: 20,
  position: 'absolute',
  top: '50%',
  left: '75%',
  transform: 'translate(-50%,-50%)',
  borderRadius: '10px',
  textAlign: 'center',
  fontSize: '200%',
  height: '520px',
  width: '370px',
};

const styles = () => ({
  card: {
    marginTop: '1%',
  },
  topButton: {
    color:'black',
    width: 350,
    height: 50,
    left: '-14%',
    variant: 'contained',
    fontSize: 16
  },
  featuredPaper:{
    background: schoolColorSecondary,
    color: 'black',
    marginTop: 30,
    marginLeft: 30,
    textAlign: 'center',
    height: 450,
    maxWidth: 600,
  },
  infoTextPaper: {
    background: 'lightgrey',
    color: 'black',
    marginTop: 10,
    height: 450,
    marginRight: 30,
    maxWidth: 600,
    textAlign: 'center',
  },
  paper: {
    height: 140,
    width: 100,
  },
  gridListContainer: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    display: 'flex',
    flexWrap: 'wrap',
    align: 'center',
    overflow: 'hidden',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      featuredCapstones: [],
      featuredSponsors: [],
    };
  }

  async componentDidMount() {
    const capstones = await strapi.getEntries('capstones');
    const sponsorList = await strapi.getEntries('Sponsors');
    this.populateFeaturedCapstones(capstones);
    this.getFeaturedSponsors(sponsorList);
    this.setState({loading: false});
  }

  getFeaturedSponsors(sponsorList) {
    const featuredSponsors = [];
    for (const sponsor in sponsorList) {
      if (sponsorList[sponsor].featured === true) {
        featuredSponsors.push(sponsorList[sponsor]);
      }
    }
    this.setState({featuredSponsors});
  }

  handleSponsorClick = (sponsorName) => {
    history.push(`/ViewASponsor/${sponsorName}`);
  };

  handleTileClick = (capstoneName) => {
    history.push(`/ViewCapstone/${capstoneName}`);
  };

  populateFeaturedCapstones(capstones) {
    const featuredCapstoneProjects = [];
    for(const thisCapstone in capstones) {
      if(capstones[thisCapstone].Featured === true) {
        featuredCapstoneProjects.push(capstones[thisCapstone]);
      }
    }
    this.setState({featuredCapstones: featuredCapstoneProjects});
  }

  render() {
    const {classes} = this.props;
    const {loading, featuredCapstones, featuredSponsors} = this.state;

    return loading ?
      <LoadingCircle/>
      :
      <div>
        <Parallax bgImage='https://www.baylor.edu/content/imglib/3/4/7/4/347452.jpg' strength={500}>
          <div style={{height: 650}}>
            <div style={surroundStyle}>
              <div style={insideStyles}>
                <Typography variant='h4' style={{color: 'white'}}>{university} University</Typography>
                <Typography variant='h2' style={{color: 'white'}}>Capstones</Typography>
                <div>
                  <Button
                    className={classes.topButton}
                    variant='contained'
                    color='secondary'
                    component={RouterLink}
                    to='/Capstones'
                  >
                    Check out Current Capstones
                  </Button>
                  <Button
                    className={classes.topButton}
                    variant='contained'
                    color='secondary'
                    component={RouterLink}
                    to='/ViewSponsors'
                  >
                    Check Out Our Sponsors
                  </Button>
                  <Button
                    className={classes.topButton}
                    variant='contained'
                    color='secondary'
                    component={RouterLink}
                    to='/Sponsors'
                  >
                    Become a Sponsor
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div/>
        </Parallax>

        <Grid
          container
          direction='row'
          alignItems='flex-end'
          justify='center'
          spacing={3}
        >
          <Grid item xs={6} align='right'>
            <Paper className={classes.featuredPaper}>
              <Typography variant='h4'>Featured Capstones</Typography>
              <div className={classes.gridListContainer}>
                <GridList cellHeight={180} cols={2}>
                  {featuredCapstones.map((result, i) => (
                    <GridListTile
                      style={{maxWidth: '300px'}}
                      key={strapiURL + featuredCapstones[i].DisplayPhoto.url}
                      onClick={() => this.handleTileClick(result.id)}
                    >
                      <img
                        src={strapiURL + featuredCapstones[i].DisplayPhoto.url}
                        alt='Capstone' style={{height: '100%', width: '100%'}}
                      />
                      <GridListTileBar
                        title={result.CapstoneName}
                        subtitle={`Made by: ${result.moderator.username}`}
                        actionIcon={
                          <IconButton
                            className={classes.icon}
                            component={RouterLink}
                            to={`/ViewCapstone/${result.id}`}
                          >
                            <InfoIcon/>
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
              <Link component={RouterLink} to='/Capstones'>See More</Link>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} className={classes.infoTextPaper}>
              <Typography variant='h4'>More Information</Typography>
              <Box p={2}>
                <Typography paragraph variant='body1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>


        <Grid container direction='column' justify='center' alignItems='center' style={{marginTop: '1.5%'}}>
          <Grid container direction='column' item xs={12} md={8}  justify='center' alignItems='center'>
            <Typography align='center' variant='h4'>Sponsors</Typography>
          </Grid>
          <Grid item xs={12} alignItems='center'>
            <GridList cellHeight={100} cols={2}>
              {featuredSponsors.map((result, i) => (
                <GridListTile
                  style={{maxWidth: '200px'}}
                  key={strapiURL + featuredSponsors[i].logo.url}
                  onClick={() => this.handleSponsorClick(result.id)}
                >
                  <img
                    src={strapiURL + featuredSponsors[i].logo.url}
                    alt='Sponsor' style={{height: '100%', width: '100%'}}
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
      </div>;
  }
}

export default compose(
  withStyles(styles),
  withWidth(),
)(Home);
