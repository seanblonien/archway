import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import routes from '../utils/Routing/routes';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import CardLayout from '../Components/CardLayout';

class Capstone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstones: []
    };
  }

  async componentDidMount() {
    const capstones = await api.capstones.find();
    this.setState({loading: false, capstones});
  }

  render() {
    const {loading, capstones} = this.state;

    if (!loading) {
      return (
        <div>
          <CardLayout title='Capstone Projects' listItems={capstones} childURL={routes.viewcapstone.genPath} imageURLFunction={imageURL.capstone}/>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

export default compose(
  withWidth(),
)(Capstone);

