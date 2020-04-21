import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import {strapiURL} from '../constants';
import 'react-image-lightbox/style.css';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: '3%',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
});

class CapstonePhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photoIndex: 0,
      isOpen: false,
    };
  }

  async componentDidMount() {
    const {capstone} = this.props;
    const photos = capstone.media;
    this.setState({photos});
  }

  render() {
    const {classes} = this.props;
    const {photos, photoIndex, isOpen} = this.state;

    return (
      <div className={classes.root}>
        <Typography variant='h4'>Photos</Typography>
        <GridList className={classes.gridList} cols={8}>
          {photos.map((photo, i) => (
            <GridListTile
              key={photo.url} cols={2}
              style={{paddingRight: '2%', paddingTop: '2%'}}
              onClick={() => this.setState({photoIndex: i, isOpen: true})}
            >
              <img src={strapiURL + photo.url} alt=''/>
            </GridListTile>
          ))}
        </GridList>
        {isOpen && (
          <Lightbox
            mainSrc={strapiURL + photos[photoIndex].url}
            nextSrc={strapiURL + photos[(photoIndex + 1) % photos.length].url}
            prevSrc={strapiURL + photos[(photoIndex + photos.length - 1) % photos.length].url}
            onCloseRequest={() => this.setState({isOpen: false})}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + photos.length - 1) % photos.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % photos.length,
              })
            }
          />
        )}
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
