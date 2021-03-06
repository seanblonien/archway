import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {Parallax} from 'react-parallax';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';

const styles = () => ({
  cover: {
    height: '500px',
    backgroundPosition: '0% 0%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
});

const Cover = ({classes, covers, children, ...rest}) => (
  covers.length > 1 ?
    <Carousel showThumbs={false} autoPlay infiniteLoop {...rest}>
      {covers.map((cover) => (
        <Parallax bgImage={imageURL.cover(cover)} strength={300} key={cover.id}>
          <div className={classes.cover}>
            {children}
          </div>
        </Parallax>
      ))}
    </Carousel>
    :
    <Parallax bgImage={imageURL.cover(covers[0])} strength={300} {...rest}>
      <div className={classes.cover}>
        {children}
      </div>
    </Parallax>
);

Cover.propTypes = {
  covers: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  children: PropTypes.node,
};

Cover.defaultProps = {
  children: null
};

export default compose(
  withStyles(styles),
)(Cover);
