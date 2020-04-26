import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const SubSectionTitle = ({children, ...rest}) => (
  <Box mb={2}>
    <Typography variant='h5' {...rest}>{children}</Typography>
    <Divider/>
  </Box>
);

SubSectionTitle.propTypes = childrenPropTypes;

export default SubSectionTitle;
