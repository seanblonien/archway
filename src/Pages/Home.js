import {Box, Button, Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import React from 'react';
import {Parallax} from 'react-parallax';
import {Link as RouterLink} from 'react-router-dom';
import compose from 'recompose/compose';
import FeaturedCapstones from '../Components/FeaturedCapstones';
import FeaturedSponsors from '../Components/FeaturedSponsors';
import {
  schoolColorPrimary,
  schoolColorSecondary,
  university,
  permissions
} from '../constants';
import Can from '../Components/Can';
import '../utils/style.css';

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const Home = ({classes}) => (
  <div>
    <Parallax bgImage='https://www.baylor.edu/content/imglib/3/4/7/4/347452.jpg' strength={500}>
      <div style={{height: 650}}>
        <div style={surroundStyle}>
          <div style={insideStyles}>
            <Typography variant='h4' style={{color: 'white'}}>{university} University</Typography>
            <Typography variant='h2' style={{color: 'white'}}>Capstones</Typography>
            <div>
              <Button
                className="largeButton"
                variant='contained'
                color='secondary'
                component={RouterLink}
                to='/Capstones'
              >
                Check out Current Capstones
              </Button>
              <Button
                className="largeButton"
                variant='contained'
                color='secondary'
                component={RouterLink}
                to='/ViewSponsors'
              >
                Check Out Our Sponsors
              </Button>
              <Button
                className="largeButton"
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
      <Can perform={permissions.application.capstones.find}>
        <FeaturedCapstones classes={classes}/>
      </Can>

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

    <Can perform={permissions.application.sponsors.find}>
      <FeaturedSponsors/>
    </Can>
  </div>
);

export default compose(
  withStyles(styles),
  withWidth(),
)(Home);
