import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import React, {useEffect, useState} from 'react';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';
import gStyle from '../utils/styles.module.css';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '1%',
  },
  leftColCard: {
    marginTop: '1%',
  },
}));

const About = () => {
  const [state, setState] = useState({loading: true, sponsors: []});
  const classes = useStyles();
  const {loading, sponsors} = state;

  useEffect( () => {
    async function fetchSponsors() {
      const sponsors = await api.sponsors.find();

      setState({loading: false, sponsors});
    }
    fetchSponsors();
  }, []);

  const bubbleClickFun = (label) => {
    const sponsorMatch = sponsors.find(sponsor => sponsor.name === label);
    if(sponsorMatch) {
      history.push(routes.viewsponsor.genPath(sponsorMatch.id));
    }
  };

  const createBubbleGraphData = () => {
    return sponsors.map((result) => ({label: result.name, value: result.capstones.length}));
  };

  return (
    <div>
      {!loading &&
        <Grid container justify='center'>
          <Grid item xs={12} md={10}>
            <Grid container justify='center'>
              <Grid item xs={12} md={12}>
                <Card className={classes.card}>
                <Typography variant='h2' className={gStyle.pageTitle}>
                  About Us
                </Typography>
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
                      bubbleClickFun={bubbleClickFun}
                      data={createBubbleGraphData()}
                    />
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </div>
  );
};

export default About;
