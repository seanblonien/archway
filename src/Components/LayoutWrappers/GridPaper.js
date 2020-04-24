import Paper from '@material-ui/core/Paper';
import React from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';
import GridBox from './GridBox';

// Additional props are applied to a Paper and Box component
const GridPaper = ({children, ...rest}) => (
  <GridBox component={Paper} pt={2} {...rest}>
    {children}
  </GridBox>
);

GridPaper.propTypes = childrenPropTypes;

export default GridPaper;
