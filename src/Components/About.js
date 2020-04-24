import {Box, useTheme} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import React, {useEffect, useState} from 'react';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';
import MediaMarkdown from './Markdown/MediaMarkdown';

const About = () => {
  const [state, setState] = useState({loading: true, sponsors: []});
  const {loading,bubbleSponsors, aboutPageContent} = state;
  const theme = useTheme();

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

  const createBubbleGraphData = () => bubbleSponsors.map((result) => (
    {label: result.name, value: result.capstones.length}
  ));

  return (
    !loading &&
      <Container maxWidth='md'>
        <Grid container direction='column' spacing={3}>
          <Grid item xs>
            <Paper component={Box} pb={3}>
              <MediaMarkdown>
                {aboutPageContent.main_paragraph}
              </MediaMarkdown>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              <Grid container justify='center'>
                <Typography>Check out past sponsors below!</Typography>
              </Grid>
              <Grid container justify='center'>
                <BubbleChart
                  graph={{
                    zoom: .8,
                    offsetX: 0.05,
                    offsetY: 0.05,
                  }}
                  showLegend={false}
                  width={theme.breakpoints.width('sm')}
                  height='600'
                  bubbleClickFun={bubbleClickFun}
                  data={createBubbleGraphData()}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
};

export default About;
