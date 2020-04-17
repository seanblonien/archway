import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Fuse from 'fuse.js';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import routes from '../utils/Routing/routes';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import CardLayout from '../Components/CardLayout';

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
      searchTerm: props.match.params,
    };
  }

  async componentDidMount() {
    const sponsors = await api.sponsors.find({verified: true});
    this.setState({loading: false, sponsors});
  }

  render() {
    const {loading, searchTerm, sponsors} = this.state;

    if (!loading) {
      // If there is no search phrase, we sort results alphabetically
      let match;
      let phrase;
      const searchOptions = {
        shouldSort: true,
        threshold: 0.3,
        minMatchCharLength: 1,
        keys: ['name',
        ]
      };

      // If there is a search phrase, we retrieve it and perform a new search.
      // If there is no a search phrase, we set match to be the list of all sponsors.

      if (searchTerm.searchTerm !== undefined) {
        phrase = searchTerm.searchTerm;
      }

      if (phrase !== undefined) {
        const fuse = new Fuse(sponsors, searchOptions);
        match = fuse.search(phrase);
      } else {
        match = sponsors;
      }

      return (
        <CardLayout title='Our Sponsors' listItems={match} childURL={routes.viewsponsor.genPath} imageURLFunction={imageURL.sponsor}/>
      );
    }

    return <LoadingCircle/>;
  }
}
export default compose(
  withStyles(styles),
  withWidth(),
)(ViewSponsors);
