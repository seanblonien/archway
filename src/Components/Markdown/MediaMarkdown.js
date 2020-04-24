import {Box} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import {strapiURL} from '../../constants';
import {A, B1, B2, H1, H2, H3, H4, H5, H6, Image} from './MarkdownComponents';
import 'highlight.js/styles/atom-one-dark.css';

const MediaMarkdown = ({children}) => {
  const rootRef = useRef();
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
  useEffect(() => {
    rootRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [children]);
  // Replaces any relative paths of uploads files to use the strapi url
  let newChildren = children.replace(/]\(\/uploads\//g, `](${strapiURL}/uploads/`);
  // Ensures upload URLs are URI encoded
  newChildren = newChildren.replace(/\/uploads\/.*\)/g,encodeURI);

  return (
    <Container ref={rootRef} maxWidth='md' component={Box}>
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
    </Container>
  );
};

MediaMarkdown.propTypes = {
  children: PropTypes.string.isRequired
};

export default MediaMarkdown;
