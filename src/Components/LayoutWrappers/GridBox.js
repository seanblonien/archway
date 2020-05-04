import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const GridBox = ({children, ...rest}) => (
  <Grid item xs>
    <Box mx={2} mb={2} px={2} pb={2} {...rest}>
      {children}
    </Box>
  </Grid>
);

GridBox.propTypes = childrenPropTypes;

export default GridBox;
