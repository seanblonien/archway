import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';
import MediaMarkdown from './Markdown/MediaMarkdown';

const useStyles = makeStyles(() => ({
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
  const {loading,bubbleSponsors, aboutPageContent} = state;

  useEffect(() => {
    async function fetchSponsors() {
      const bubbleSponsorsTemp = await api.sponsors.find();
      const aboutPageContentTemp = await api.aboutpage.find();
      setState({loading: false, bubbleSponsors: bubbleSponsorsTemp, aboutPageContent: aboutPageContentTemp});
    }

    fetchSponsors();
  }, []);

  const bubbleClickFun = (label) => {
    const sponsorMatch = bubbleSponsors.find(sponsor => (sponsor.name === label));
    if (sponsorMatch) {
      history.push(routes.viewsponsor.genPath(sponsorMatch.id));
    }
  };

  const createBubbleGraphData = () => bubbleSponsors.map((result) => ({label: result.name, value: result.capstones.length}));

  return (
    <div>
      {!loading && <Grid container justify='center'>
        <Grid item xs={12} md={10}>
          <Grid container justify='center'>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <MediaMarkdown>
                    {aboutPageContent.main_paragraph}
                  </MediaMarkdown>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Grid container justify='center'>
                  <Typography align='center' style={{marginBottom: '1%'}}>
                    <b>Check out our Sponsors below!</b>
                  </Typography>
                </Grid>
                <Grid container justify='center'>
                  <BubbleChart
                    graph={{
                      zoom: 0.9,
                      offsetX: 0.05,
                      offsetY: 0.05,
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
      </Grid>}
    </div>
  );
};

export default About;
