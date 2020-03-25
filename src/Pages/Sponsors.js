import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as url from '../Static/businessmen.jpg';
import * as url2 from '../Static/students.jpg';
import api from '../Services/api';


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

class Sponsors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageContent: [],
    };
  }

  async componentDidMount() {
    const pageContent = await api.sponsorpage.find();
    this.setState({pageContent});
  }

  render() {
    const {classes} = this.props;
    const {pageContent} = this.state;

    return (
      <div>
        <div className={classes.bgImage}>
          <Grid container direction='row' display='inline' justify='flex-end'>
            <Grid item xs={12} md={4}>
              <Card className={classes.sidePanel}>
                <CardContent>
                  <Typography variant='h4' align='center' gutterBottom>
                    {pageContent.main_title}
                  </Typography>
                  <br/>
                  <Typography variant='body1'>
                    {pageContent.main_paragraph}
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
                    {pageContent.title1}
                  </Typography>
                  <Typography variant='body1'>
                    {pageContent.paragraph1}
                  </Typography>
                </Container>
              </Grid>
              <br/>
              <Grid item>
                <Container>
                  <Typography variant='h5'>
                    {pageContent.title2}
                  </Typography>
                  <Typography variant='body1'>
                    {pageContent.paragraph2}
                  </Typography>
                </Container>
              </Grid>
              <br/>
              <Grid item>
                <Container>
                  <Typography variant='h5'>
                    {pageContent.title3}
                  </Typography>
                  <Typography variant='body1'>
                    {pageContent.paragraph3}
                  </Typography>
                </Container>
              </Grid>
            </Grid>
            <Grid item container direction='column' md={5}>
              <Grid item>
                <Container>
                  <Typography variant='h5'>
                    {pageContent.title4}
                  </Typography>
                  <Typography variant='body1'>
                    {pageContent.paragraph4}
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
  }
}

Sponsors.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default (withStyles(styles)(withWidth()(Sponsors)));
