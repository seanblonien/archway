import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const SectionTitle = ({children, ...rest}) => (
  <Box pb={1}>
    <Typography variant='h4' align='left' {...rest}>{children}</Typography>
  </Box>
);

SectionTitle.propTypes = childrenPropTypes;

export default SectionTitle;
