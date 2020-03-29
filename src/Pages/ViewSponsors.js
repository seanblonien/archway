import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import Fuse from 'fuse.js';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import history from '../utils/history';
import '../utils/style.css';
import CardLayout from "../Components/CardLayout";

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
    const sponsors = await api.sponsors.find();
    this.setState({loading: false, sponsors});
  }

  handleTileClick = (id) => {
    history.push(`/ViewASponsor/${id}`);
  };

  render() {
    const {classes} = this.props;
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
          <CardLayout title='Our Sponsors' listItems={sponsors} childURL='/ViewASponsor/' imageURLFunction={imageURL.sponsor}/>
      );
    }

    return <LoadingCircle/>;
  }
}
export default compose(
  withStyles(styles),
  withWidth(),
)(ViewSponsors);
