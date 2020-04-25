import {Link} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

export const useLinkStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    '&:hover, &:active': {
      color: theme.palette.action.hover
    },
    '&:visited': {
      color: theme.palette.action.selected,
    },
  }
}));


export const StyledLink = React.forwardRef(({to, ...rest}, ref) => {
  const theme = useTheme();
  const classes = useLinkStyles(theme);
  return <Link ref={ref} className={classes.link} component={RouterLink} to={to} {...rest}/>;
});

StyledLink.propTypes = {
  to: PropTypes.string.isRequired
};
