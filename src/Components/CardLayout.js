import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Cards from './Cards';
import '../utils/style.css';

const cardLayout = ({title, listItems, childURL, imageURLFunction}) => (
  <div className='mainContentBorder'>
    <Typography className='pageTitle' variant='h2' gutterBottom>
      {title}
    </Typography>
    <br/>
    <Grid container direction='row' spacing={4}>
      <Cards listItems={listItems} childURL={childURL} imageURLFunction={imageURLFunction}/>
    </Grid>
  </div>
);

cardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  childURL: PropTypes.string.isRequired,
  imageURLFunction: PropTypes.func.isRequired
};

export default cardLayout;
