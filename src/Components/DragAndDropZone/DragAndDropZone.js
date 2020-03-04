import React from 'react';
import {useDropzone} from 'react-dropzone';
import "./style.css";

export default function Accept() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png'
    });

    return (
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />

                {acceptedFiles.length === 0 ?
                    <div>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    :
                    <div>
                        <img className="preview" src={URL.createObjectURL(acceptedFiles[0])} alt="Preview"/>
                    </div>
                }

            </div>
    );
}

