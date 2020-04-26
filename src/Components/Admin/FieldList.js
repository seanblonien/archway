import {Box, List, ListItemText, Typography, useTheme} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React from 'react';
import {useLinkStyles} from '../Typography/StyledLink';

const FieldList = props => {
  const {fields, label} = props;
  const theme = useTheme();
  const classes = useLinkStyles(theme);

  return (
    <Box>
      <Typography label={label}>{label}</Typography>
      <List dense>
        {fields && fields.map(field =>
          <ListItem key={field} className={classes.link}>
            <ListItemText>{field}</ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

FieldList.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};

export default FieldList;
