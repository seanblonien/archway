import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Cards from './Cards';

const cardLayout = ({title, listItems, childURL}) => (
  <div style={{padding: 50}}>
    <Typography align='center' variant='h2' gutterBottom>
      {title}
    </Typography>
    <br/>
    <Grid container direction='row' spacing={4}>
      <Cards listItems={listItems} childURL={childURL}/>
    </Grid>
  </div>
);

cardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  childURL: PropTypes.string.isRequired
};

export default cardLayout;
