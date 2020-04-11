/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-find-dom-node */
import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import {getDefaultCommands} from 'react-mde/lib/js/commands';
import insertTextAtCursor from 'insert-text-at-cursor';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import api from '../../Services/api';
import MediaMarkdown from './MediaMarkdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const formatImage = (text) => `![image](${text})`;
const formatUpload = (text) => `[upload](${text})`;
const outerRefs = {};

const MarkdownEditor = ({value, setValue, uniqueName, ...rest}) => {
  // Create this editor's outer ref that will be used for finding the textarea
  const outerRef = React.createRef();
  // The active tab of the markdown editor
  const [tab, setTab] = useState('write');
  // This references the file input ref used to simulate clicking
  const [fileInputRef, setFileInputRef] = useState(null);

  // Simulates clicking to override the insert image functionality
  const simulateClick = () => {
    if(!fileInputRef) return;
    fileInputRef.disabled = false;
    fileInputRef.click();
  };

  // Inserts the given text into this editor's ReactMde textarea
  const insertText = (text) => {
    // Because ReactMde doesn't give us a ref value for the text area, we have to find it ourselves
    const inputs = ReactDOM.findDOMNode(outerRefs[uniqueName].current).getElementsByClassName('mde-text');

    // Return if not found or found multiple editors
    if (!inputs || inputs.length !== 1) {
      return null;
    }
    // Select the single textarea input
    const input = inputs[0];
    // Insert the text at the cursor
    insertTextAtCursor(input, text);

    // Return the changed input value to update the state value in the React state
    return input.value;
  };

  // Callback to use for when files are uploaded
  const onDrop = useCallback(async (files) => {
    try {
      if(_.isArray(files) && !_.isEmpty(files)) {
        const fileUploads = files.map(file => {
          const formData = new FormData();
          formData.append('files', file);
          return api.uploads.upload(formData);
        });
        const fileUploadsResponse = await Promise.all(fileUploads);
        const fileUploadsData = fileUploadsResponse.reduce((arr, response) => {
          arr.push(...response.data);
          return arr;
        }, []);
        const textToInsert = fileUploadsData.reduce((str, file) =>
          `${str + (/image/.test(file.mime) ? formatImage(file.url) : formatUpload(file.url))}\n`
        ,'');
        const input = insertText(textToInsert);
        if (input) {
          setValue(input);
        }
      }
    } catch (e) {
      // TODO handle
    }
  }, []);

  // Props for the dropzone container and input elements
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true});

  // Override the image button in the ReactMde
  const commands = getDefaultCommands();
  commands[1].commands[3].execute = simulateClick;

  // Save this editor's outer reference used find this editor's ReactMde textarea
  outerRefs[uniqueName] = outerRef;

  return (
    <div ref={outerRef}>
      <div {...getRootProps()}>
        <ReactMde
          commands={commands}
          value={value}
          onChange={setValue}
          selectedTab={tab}
          onTabChange={setTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<MediaMarkdown>{markdown}</MediaMarkdown>)
          }
          {...rest}
        />
        <input{...getInputProps()} disabled={!isDragActive} ref={setFileInputRef}/>
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  uniqueName: PropTypes.string.isRequired
};

export default MarkdownEditor;
