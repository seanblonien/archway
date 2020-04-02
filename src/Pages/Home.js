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
import HomeInfo from '../Components/HomeInfo';
import {
  schoolColorPrimary,
  schoolColorSecondary,
  university,
  permissions
} from '../constants';
import Can from '../Components/Can';
import gStyle from '../utils/styles.module.css';

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
                className={gStyle.largeButton}
                variant='contained'
                color='secondary'
                component={RouterLink}
                to='/Capstones'
              >
                Check out Current Capstones
              </Button>
              <Button
                className={gStyle.largeButton}
                variant='contained'
                color='secondary'
                component={RouterLink}
                to='/ViewSponsors'
              >
                Check Out Our Sponsors
              </Button>
              <Button
                className={gStyle.largeButton}
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
          <Box p={2}>
            <HomeInfo/>
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
