import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {strapiURL} from '../constants';

const MediaMarkdown = ({children}) => (
  <Markdown>
    {children.replace('](/uploads/', `](${strapiURL}/uploads/`)}
  </Markdown>
);

MediaMarkdown.propTypes = {
  children: PropTypes.string.isRequired
};

export default MediaMarkdown;
