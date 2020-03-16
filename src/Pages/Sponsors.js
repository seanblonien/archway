import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import React from 'react';
import PropTypes from 'prop-types';
import {university} from '../constants';
import * as url from '../Static/businessmen.jpg';
import * as url2 from '../Static/students.jpg';

const styles = () => ({
  button: {
    color: 'white',
    border: '2px solid white'
  },
  bgImage: {
    width: '100%',
    height: '800px',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover'
  },
  studentImage: {
    backgroundImage: `url(${url2})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '400px'
  },
  sidePanel: {
    height: '800px',
    backgroundColor: 'black',
    color: 'white',
    opacity: '0.7'
  },
  gridBox: {
    border: '8px solid blue',
    borderRadius: 0,
  }
});

const Sponsors = props => {
  const {classes} = props;

  return (
    <div>
      <div className={classes.bgImage}>
        <Grid container direction='row' display='inline' justify='flex-end'>
          <Grid item xs={12} md={4}>
            <Card className={classes.sidePanel}>
              <CardContent>
                <Typography variant='h4' align='center' gutterBottom>
                  Sponsorship at {university}
                </Typography>
                <br/>
                <Typography variant='body1'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <br/>
                <Grid item align='center'>
                  <Button className={classes.button} size='large'>
                    Sponsor Signup
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <br/>
        <Grid container direction='row' justify='space-evenly'>
          <Grid item container direction='column' md={5}>
            <Grid item>
              <Container>
                <Typography variant='h5'>
                  Benefits to Students
                </Typography>
                <Typography variant='body1'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Container>
            </Grid>
            <br/>
            <Grid item>
              <Container>
                <Typography variant='h5'>
                  Benefits to Sponsors
                </Typography>
                <Typography variant='body1'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Container>
            </Grid>
            <br/>
            <Grid item>
              <Container>
                <Typography variant='h5'>
                  What Makes a Good Project
                </Typography>
                <Typography variant='body1'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Container>
            </Grid>
          </Grid>
          <Grid item container direction='column' md={5}>
            <Grid item>
              <Container>
                <Typography variant='h5'>
                  How to Become a Sponsor
                </Typography>
                <Typography variant='body1'>
                  <ol>
                    <li>Sign up for an account</li>
                    <li>Fill out the proejct proposal</li>
                    <li>Wait for approval for proposal</li>
                  </ol>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <br/><br/>
              </Container>
            </Grid>
            <Grid item>
              <div className={classes.studentImage}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <br/>
    </div>
  );
};

Sponsors.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default (withStyles(styles)(withWidth()(Sponsors)));
