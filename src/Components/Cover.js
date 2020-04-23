import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {Parallax} from 'react-parallax';
import {imageURL} from '../utils/utils';

const styles = () => ({
  cover: {
    height: '500px',
    backgroundPosition: '0% 0%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
});

const Cover = (props) => {
  const {classes, covers, children} = props;

  return covers.length > 1 ?
    <Carousel showThumbs={false}>
      {covers.map((cover) => (
        <Parallax bgImage={imageURL.cover(cover)} strength={300} key={cover.id}>
          <div className={classes.cover}>
            {children}
          </div>
        </Parallax>
      ))}
    </Carousel>
    :
    <Parallax bgImage={imageURL.cover(covers[0])} strength={300}>
      <div className={classes.cover}>
        {children}
      </div>
    </Parallax>
  ;
};

Cover.propTypes = {
  covers: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(Cover);