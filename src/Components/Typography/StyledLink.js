/* eslint-disable jsx-a11y/anchor-has-content */
import {Link} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {A} from '../Markdown/MarkdownComponents';

export const linkStyles = theme => ({
  link: {
    color: theme.palette.primary.main,
    '&:hover, &:active': {
      color: theme.palette.secondary.main,
      textDecorationLine: 'underline'
    },
    textDecorationLine: 'none'
  }
});

export const useLinkStyles = makeStyles(linkStyles);

const ixExternal = /^https?:\/\//;

// eslint-disable-next-line react/prop-types
export const StyledLink = React.forwardRef(({to, ...rest}, ref) => {
  const theme = useTheme();
  const linkClasses = useLinkStyles(theme);
  return (
    ixExternal.test(to) ?
      <A ref={ref} href={to} {...rest}/>
      :
      <Link ref={ref} {...rest} className={`${linkClasses.link}`} component={RouterLink} to={to}/>
  );
});
