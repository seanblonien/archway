import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import _ from 'lodash';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {Parallax} from 'react-parallax';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import {strapiURL} from '../constants';

const styles = () => ({
  cover: {
    height: '600px',
    backgroundPosition: '0% 0%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
  },
});

class ViewCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstone: {},
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const capstone = await api.capstones.findOne(match.params.capstoneID);
    this.setState({loading: false, capstone});
  };

  render() {
    const {classes} = this.props;
    const {loading, capstone} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <Parallax bgImage={strapiURL + capstone.coverPhoto.url} strength={200}>
          <div className={classes.cover}/>
        </Parallax>

      </div>
    ;
  }
}

export default compose(
  withStyles(styles),
  withWidth(),
)(ViewCapstone);

