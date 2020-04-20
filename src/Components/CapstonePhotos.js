import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import routes from '../utils/Routing/routes';
import history from '../utils/Routing/history';
import {strapiURL} from '../constants';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
});

class CapstonePhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  async componentDidMount() {
    const {capstone} = this.props;
    const photos = capstone.media;
    this.setState({photos});
  }

  handleTileClick = (title) => {
    history.push(routes.viewprofile.genPath(title));
  };

  render() {
    const {classes} = this.props;
    const {photos} = this.state;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={8}>
          {photos.map((photo) => (
            <GridListTile key={photo.url} cols={2} style={{paddingRight: '2%', paddingTop: '2%'}}>
              <img src={strapiURL + photo.url} alt=''/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

CapstonePhotos.propTypes = {
  capstone: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(CapstonePhotos);
