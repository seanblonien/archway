import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import api from '../../Services/api';
import insertText from './insertText';
import MediaMarkdown from './MediaMarkdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const outerRef = React.createRef();

const MarkdownEditor = ({value, setValue, ...rest}) => {
  const [tab, setTab] = useState('write');
  const onDrop = useCallback(async (files) => {
    try {
      const formData = new FormData();
      formData.append('files', files[0]);
      const response = await api.uploads.upload(formData);
      const fileUploads = response.data;
      const input = insertText(outerRef, `![](${fileUploads[0].url})`);
      if(input) {
        setValue(input);
      }
    }catch(e){
      // TODO handle
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div ref={outerRef}>
      <div {...getRootProps()}>
        <ReactMde
          {...rest}
          value={value}
          onChange={setValue}
          selectedTab={tab}
          onTabChange={setTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<MediaMarkdown>{markdown}</MediaMarkdown>)
          }
        />
        {
          isDragActive
            ? <input {...getInputProps()}/>
            : <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
};

export default MarkdownEditor;
