/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/alt-text */
import {Typography} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {useLinkStyles} from '../Typography/StyledLink';

// Formats an img src to use Strapi's absolute URL on any /uploads files.
// Image component will parse a src URL's width/height query parameters and
// size the image accordingly while stripping off the query parameters.
//
// For example, ?height=500&width=500 at the end of an embedded file URL.
export const Image = (props) => {
  const propValues = {...props};
  const {src} = propValues;
  const urlParams = new URLSearchParams((new URL(src)).search);
  const style = {'maxWidth': '100%'};
  for (const [key, value] of urlParams.entries()) {
    if(key in document.body.style) {
      style[key] = `${value}`;
    } else {
      propValues[key] = value;
    }
  }
  propValues.src = src.split('?')[0];
  propValues.style = style;

  return <span style={{textAlign: 'center', display: 'block'}}><img {...propValues}/></span>;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

// Returns styled MaterialUI Typography component for h1 variant.
export const H1 = (props) => <Typography {...props} variant='h1'/>;

// Returns styled MaterialUI Typography component for h2 variant.
export const H2 = (props) => <Typography {...props} variant='h2'/>;

// Returns styled MaterialUI Typography component for h3 variant.
export const H3 = (props) => <Typography {...props} variant='h3'/>;

// Returns styled MaterialUI Typography component for h4 variant.
export const H4 = (props) => <Typography {...props} variant='h4'/>;

// Returns styled MaterialUI Typography component for h5 variant.
export const H5 = (props) => <Typography {...props} variant='h5'/>;

// Returns styled MaterialUI Typography component for h6 variant.
export const H6 = (props) => <Typography {...props} variant='h6'/>;

// Returns styled MaterialUI Typography component for body1 variant.
export const B1 = (props) => <Typography {...props} variant='body1' paragraph/>;

// Returns styled MaterialUI Typography component for body2 variant.
export const B2 = (props) => <Typography {...props} variant='body2' component='span'/>;

// Returns styled MaterialUI link component for **external** links.
export const A = ({...props}) =>  {
  const theme = useTheme();
  const classes = useLinkStyles(theme);
  return <a {...props} className={classes.link} target='_blank'/>;
};
