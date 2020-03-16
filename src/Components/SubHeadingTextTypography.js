import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';

class SubHeadingTextTypography extends Component {
  resizeSubheadingText = () => {
    const {width} = this.props;

    if(width === 'xl') {
      return 'h4';
    }if(width === 'lg') {
      return 'h5';
    }if(width ==='md') {
      return 'h5';
    }if(width ==='sm') {
      return 'h6';
    }
    return 'subtitle1';
  };

  render() {
    const {align, text} = this.props;

    return (
      <Typography align={align} variant={this.resizeSubheadingText()}>
        <b>{text}</b>
      </Typography>
    );
  }
}

SubHeadingTextTypography.propTypes = {
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
  width: PropTypes.string,
};

SubHeadingTextTypography.defaultProps = {
  align: 'left',
  width: 'md'
};

export default compose(
  withWidth(),
)(SubHeadingTextTypography);
