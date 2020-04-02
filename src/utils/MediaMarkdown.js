import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {strapiURL} from '../constants';

// Formats markdown to use Strapi's absolute URL on any /uploads files.
//
// Allows any embedded image to use query parameters for height/width,
// i.e., ?height=500&width=500 at the end of an embedded files/images.
const MediaMarkdown = ({children}) => {
  // Image component will parse a src URL's width/height parameters and size the
  // image accordingly while stripping off the query parameters
  const Image = (props) => {
    const {src, alt} = props;
    const urlParams = new URLSearchParams((new URL(src)).search);
    const height = urlParams.get('height');
    const width = urlParams.get('width');
    const newSrc = src.split('?')[0];

    return <img {...props} alt={alt} src={newSrc} height={height} width={width}/>;
  };
  Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };

  // Replaces any relative paths of uploads files to use the strapi url
  const childrenAbsoluteMedia = children.replace('](/uploads/', `](${strapiURL}/uploads/`);

  return (
    <Markdown options={{overrides: {img: {component: Image}}}}>
      {childrenAbsoluteMedia}
    </Markdown>
  );
};

MediaMarkdown.propTypes = {
  children: PropTypes.string.isRequired
};

export default MediaMarkdown;
