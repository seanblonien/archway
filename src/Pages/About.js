import React, {useEffect, useState} from 'react';
import api from '../Services/api';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import GridPaper from '../Components/LayoutWrappers/GridPaper';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';

const About = () => {
  const [state, setState] = useState({loading: true});
  const {loading, aboutPageContent} = state;

  useEffect(() => {
    async function fetchContent() {
      const aboutPageContentTemp = await api.aboutpage.find();
      setState({loading: false, aboutPageContent: aboutPageContentTemp});
    }

    fetchContent();
  }, []);

  return (
    !loading &&
      <GridPageContainer>
        <GridPaper pb={2}>
          <MediaMarkdown>
            {aboutPageContent.main_paragraph}
          </MediaMarkdown>
        </GridPaper>
      </GridPageContainer>
  );
};

export default About;
