import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import root from '../../utils/styles.module.css';
import Cards from '../Cards';

const CardLayout = ({title, listItems, childURL, imageURLFunction}) => (
  <div className={root.mainContentBorder}>
    <Typography className={root.pageTitle} variant='h2' gutterBottom>
      {title}
    </Typography>
    <br/>
    <Cards childURL={childURL} imageURLFunction={imageURLFunction} listItems={listItems}/>
  </div>
);

CardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  childURL: PropTypes.func.isRequired,
  imageURLFunction: PropTypes.func.isRequired
};

export default CardLayout;
