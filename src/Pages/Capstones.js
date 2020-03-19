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
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import FilterBar from '../Components/FilterBar';
import LoadingCircle from '../Components/LoadingCircle';
import history from '../utils/history';

const styles = {
  // Custom color for icon
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

class Capstone extends Component {
  // Resizes image grid list based on screen size
  static getColumns(props) {
    if(props.width === 'xl') {
      return 5;
    }if(props.width === 'lg') {
      return 5;
    }if(props.width ==='md') {
      return 3;
    }
    if(props.width === 'sm') {
      return 2;
    }
    return 1;
  }

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

  handleTileClick = (capstoneName) => {
    history.push(`/ViewCapstone/${capstoneName}`);
  };

  render() {
    const {classes} = this.props;
    const {loading, searchTerm, capstones} = this.state;

    if (!loading) {
      // Search functionality
      let match;
      let phrase;
      const searchOptions = {
        shouldSort: true,
        threshold: 0.3,
        minMatchCharLength: 1,
        keys: ['CapstoneName',
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

          {/* Page heading */}
          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Typography variant='h4' style={{marginTop: '16px'}}>Capstone Projects</Typography>
              <Divider/>
              <br/>
            </Grid>
          </Grid>

          <Grid container justify='center' style={{marginBottom: '16px'}}>
            <Grid item xs={12} md={10}>
              <GridList cellHeight={250} cols={Capstone.getColumns(this.props)}>
                {/* Creates a gridlist tile for each capstone */}
                {match.map((result, i) => match[i].DisplayPhoto && match[i].DisplayPhoto.url != null ? (
                  <GridListTile key={match[i].DisplayPhoto.url} onClick={() => this.handleTileClick(result._id)}>
                    {/* The display photo for each gridlisttile */}
                    <img src={imageURL.capstone(match[i].DisplayPhoto)} alt='Capstone' style={{height: '100%', width: '100%'}}/>
                    <GridListTileBar
                      title={result.CapstoneName}
                      subtitle={`Made by: ${result.moderator.username}`}
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          component={Link}
                          to={`/ViewCapstone/${result._id}`}
                        >
                          <InfoIcon/>
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ) : '')}
              </GridList>
            </Grid>
          </Grid>
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

Capstone.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(Capstone);

