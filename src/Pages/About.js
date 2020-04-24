import {useTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import React, {useEffect, useState} from 'react';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import GridPaper from '../Components/LayoutWrappers/GridPaper';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';

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
      <GridPageContainer>
        <GridPaper pb={2}>
          <MediaMarkdown>
            {aboutPageContent.main_paragraph}
          </MediaMarkdown>
        </GridPaper>
        <GridPaper>
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
              height={600}
              bubbleClickFun={bubbleClickFun}
              data={createBubbleGraphData()}
            />
          </Grid>
        </GridPaper>
      </GridPageContainer>
  );
};

export default About;
