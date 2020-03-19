import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import history from '../utils/history';
import LoadingCircle from './LoadingCircle';
import api from '../Services/api';

const styles = {
  card: {
    marginTop: '1%',
  },
  leftColCard: {
    marginTop: '1%',
  },
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sponsors: []
    };
  }

  async componentDidMount() {
    const sponsors = await api.sponsors.find();

    this.setState({loading: false, sponsors});
  }

  bubbleClickFun = (label) => {
    const {sponsors} = this.state;

    const sponsorMatch = sponsors.find(sponsor => sponsor.name === label);
    if(sponsorMatch) {
      history.push(`/ViewASponsor/${sponsorMatch.id}`);
    }
  };

  createBubbleGraphData() {
    const {sponsors} = this.state;
    return sponsors.map((result) => ({label: result.name, value: result.capstones.length}));
  }

  render() {
    const {classes} = this.props;
    const {loading} = this.state;

    if(!loading) {
      return (
        <div>
          <Grid container justify='center'>
            <Grid item xs={12} md={10}>
              <Card className={classes.card}>
                <Typography align='center' style={{marginBottom: '1%'}}>
                  <b>About Page</b>
                </Typography>
                <Divider/>
                <CardContent>
                  <Typography align='center'>
                    <b>Our mission is to provide students a reliable place to store and present
                      their capstone projects.</b>
                  </Typography>
                </CardContent>
              </Card>
              <Grid container justify='center'>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardContent>
                      <Typography>
                        <b>What is Cappy?</b>
                      </Typography>
                      <Divider/>
                      <Typography style={{marginTop: '1%'}}>
                        Cappy is a Capstone Management System designed for students and sponsors
                        alike. We provide students a platform to <b>store, edit, and
                          present</b> their capstone projects.
                        Moreover, Cappy gives our sponsors a firsthand view of the projects that
                        they have sponsored.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container justify='center'>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <Grid container justify='center'>
                      <Typography align='center' style={{marginBottom: '1%'}}>
                        <b>Sponsors</b>
                      </Typography>
                    </Grid>
                    <Grid container justify='center'>
                      <BubbleChart
                        graph={{
                          zoom: 1,
                          offsetX: 0,
                          offsetY: 0,
                        }}
                        showLegend={false}
                        width={1000}
                        height={1000}
                        bubbleClickFun={this.bubbleClickFun}
                        data={this.createBubbleGraphData()}
                      />
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

About.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(About);
