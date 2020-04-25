import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const GridPageContainer = ({children, width, ...rest}) => (
  <Container maxWidth='md' disableGutters {...rest}>
    <Grid container direction='column' spacing={0} justify='flex-start'>
      {children}
    </Grid>
  </Container>
);

GridPageContainer.propTypes = childrenPropTypes;

export default GridPageContainer;
