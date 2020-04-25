import {Box} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import React from 'react';
import {childrenPropTypes, widthPropTypes} from '../../utils/PropTypesConfig';
import {widthMatchUp} from '../../utils/utils';

const PageWithMargin = ({children, width, ...rest}) => (
  <Box m={widthMatchUp(width, 'md') ? 3 : 1} {...rest}>
    {children}
  </Box>
);

PageWithMargin.propTypes = {
  ...childrenPropTypes,
  ...widthPropTypes
};

export default withWidth()(PageWithMargin);
