import React from 'react';
import {useDropzone} from 'react-dropzone';
// TODO refactor to use local react style
import './style.css';

export default function Accept() {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()}/>

      {acceptedFiles.length === 0 ?
        <div>
          <p>Drag and drop some files here, or click to select files</p>
        </div>
        :
        <div>
          <img className='image-preview' src={URL.createObjectURL(acceptedFiles[0])} alt='Preview'/>
        </div>
      }
    </div>
  );
}

