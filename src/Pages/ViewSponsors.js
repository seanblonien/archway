import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import routes from '../utils/Routing/routes';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import CardLayout from '../Components/LayoutWrappers/CardLayout';

const styles = {
  card: {
    raised: true,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

class ViewSponsors extends Component {
  static getColumns(props) {
    if(props.width === 'xl') {
      return 5;
    }if(props.width === 'lg') {
      return 5;
    }if(props.width ==='md') {
      return 3;
    }

    return 1;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sponsors: [],
    };
  }

  async componentDidMount() {
    const sponsors = await api.sponsors.find({isVerified: true});
    this.setState({loading: false, sponsors});
  }

  render() {
    const {loading, sponsors} = this.state;

    if (!loading) {
      return (
        <CardLayout title='Our Sponsors' listItems={sponsors} childURL={routes.viewsponsor.genPath} imageURLFunction={imageURL.sponsor}/>
      );
    }

    return <LoadingCircle/>;
  }
}
export default compose(
  withStyles(styles),
  withWidth(),
)(ViewSponsors);
