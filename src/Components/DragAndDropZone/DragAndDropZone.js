import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import './style.css';




export default function Accept(props) {
  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const [hasAccept, setAccept] = useState(false);


  useEffect(() => {
    if (acceptedFiles.length > 1) {
      while (acceptedFiles.length > 1) {
        acceptedFiles.shift();
      }
    }
    if (acceptedFiles.length >= 1 && !hasAccept) {
      props.acceptImage(acceptedFiles);
      setAccept(true);
      if (props.removeImg) {
        console.log('removing');
        acceptedFiles.length = 0;
        props.setRemoveImg(false);
      }
    }


  });

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

