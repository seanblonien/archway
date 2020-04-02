import React, {Component} from 'react';
import LoadingCircle from './LoadingCircle';
import MediaMarkdown from '../utils/MediaMarkdown';
import api from '../Services/api';

class HomeInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageContent: [],
    };
  }

  async componentDidMount() {
    const pageContent = await api.homepage.find();
    this.setState({loading: false, pageContent});
  }

  render() {
    const {loading, pageContent} = this.state;

    return loading ?
      <LoadingCircle/>
      :
      <MediaMarkdown>
        {pageContent.infoparagraph}
      </MediaMarkdown>
    ;
  }
}

export default HomeInfo;