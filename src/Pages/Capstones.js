import withWidth from '@material-ui/core/withWidth';
import Fuse from 'fuse.js';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import FilterBar from '../Components/FilterBar';
import LoadingCircle from '../Components/LoadingCircle';
import history from '../utils/Routing/history';
import CardLayout from '../Components/CardLayout';

class Capstone extends Component {

  constructor(props) {
    super(props);
    const {match: {params}} = this.props;

    this.state = {
      loading: true,
      searchTerm: params,
      capstones: []
    };
  }

  async componentDidMount() {
    const capstones = await api.capstones.find();
    this.setState({loading: false, capstones});
  }

  handleTileClick = (title) => {
    history.push(`/ViewCapstone/${title}`);
  };

  render() {
    const {loading, searchTerm, capstones} = this.state;

    if (!loading) {
      // Search functionality
      let match;
      let phrase;
      const searchOptions = {
        shouldSort: true,
        threshold: 0.3,
        minMatchCharLength: 1,
        keys: ['title',
          'department.name',
          'sponsors.name',
        ]
      };

      if (searchTerm.searchTerm !== undefined) {
        phrase = searchTerm.searchTerm;
      }

      if (phrase !== undefined) {
        const fuse = new Fuse(capstones, searchOptions);
        match = fuse.search(phrase);
      } else {
        match = capstones;
      }

      return (
        <div>
          <FilterBar/>

          <CardLayout title='Capstone Projects' listItems={match} childURL='/ViewCapstone/' imageURLFunction={imageURL.capstone}/>
        </div>
      );
    }

    return (
      <>
        <FilterBar/>
        <LoadingCircle/>
      </>
    );
  }
}

export default compose(
  withWidth(),
)(Capstone);

