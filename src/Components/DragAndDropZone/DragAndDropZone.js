import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
// TODO refactor to use local react style
import './style.css';

export default function Accept(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const [hasAccept, setAccept] = useState(false);

  // only keep one file in the accept files
  // while (acceptedFiles.length > 1) {
  //   acceptedFiles.shift();
  // }


  if (acceptedFiles.length >= 1 && !hasAccept) {
    console.log(acceptedFiles);
    props.acceptImage(acceptedFiles);
    setAccept(true);
  }

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()}/>

      {acceptedFiles.length === 0 ?
        <div>
          <p>{props.prompt}</p>
        </div>
        :
        <div>
          <img className='image-preview' src={URL.createObjectURL(acceptedFiles[0])} alt='Preview'/>
        </div>
      }
    </div>
  );
}

