import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';

class PageTitleTypography extends Component {
  // Resize title text based on screen size
  resizeTitleText = () => {
    const {size} = this.props;

    if(size === 'xl') {
      return 'h1';
    }if(size === 'lg') {
      return 'h2';
    }if(size ==='md') {
      return 'h3';
    }if(size ==='sm') {
      return 'h4';
    }

    return 'h6';
  };

  render() {
    const {size, align, text} = this.props;

    return (
      <Typography align={align} variant={size || this.resizeTitleText()}>
        <b>{text}</b>
      </Typography>
    );
  }
}

PageTitleTypography.propTypes = {
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
  size: PropTypes.string
};

PageTitleTypography.defaultProps = {
  align: 'center',
  size: 'md'
};

export default compose(
  withWidth(),
)(PageTitleTypography);
