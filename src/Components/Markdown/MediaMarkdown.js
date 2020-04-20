import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {strapiURL} from '../../constants';
import {A, B1, B2, H1, H2, H3, H4, H5, H6, Image} from './MarkdownComponents';

const MediaMarkdown = ({children}) => {
  // Replaces any relative paths of uploads files to use the strapi url
  let newChildren = children.replace(/]\(\/uploads\//g, `](${strapiURL}/uploads/`);
  // Ensures upload URLs are URI encoded
  newChildren = newChildren.replace(/\/uploads\/.*\)/g,encodeURI);

  return (
    <Markdown
      options={{overrides: {
        img: {component: Image},
        h1: {component: H1},
        h2: {component: H2},
        h3: {component: H3},
        h4: {component: H4},
        h5: {component: H5},
        h6: {component: H6},
        a: {component: A},
        p: {component: B1},
        span: {component: B2},
      }}}
    >
      {newChildren}
    </Markdown>
  );
};

MediaMarkdown.propTypes = {
  children: PropTypes.string.isRequired
};

export default MediaMarkdown;
