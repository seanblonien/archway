import {Box} from '@material-ui/core';
import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import './style.css';
import {imageURL} from '../../utils/utils';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'white',
  },
}));

export default function DragAndDrop({files, setFiles, accept, single, deletedFiles}) {
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    setFiles(single ? [acceptedFiles[0]] : acceptedFiles, false);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});


  return (
    <>
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} accept={accept}/>
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        }
      </div>
      {files && !_.isEmpty(files) &&
        <Box my={1} component={GridList} cols={3}>
          {files.map((file) => (
            <GridListTile key={file.name}>
              {file.id
                ? <img src={imageURL.capstone(file)} alt={file.name}/>
                : <img src={URL.createObjectURL(file)} alt={file.name}/>

              }
              <GridListTileBar
                title={file.name}
                actionIcon={
                  <IconButton aria-label={`Delete ${file.name}`}>
                    <DeleteIcon
                      className={classes.icon}
                      onClick={() =>
                      {
                        setFiles(files.filter(f => f.name !== file.name), true);
                        if (typeof deletedFiles === 'function' && file.id) {
                          deletedFiles(file.id);
                        }
                      }
                      }
                    />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </Box>
      }
    </>
  );
}
// TODO :failed propTypes of Object
DragAndDrop.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
  accept: PropTypes.string,
  single: PropTypes.bool,
  deletedFiles: PropTypes.func
};

DragAndDrop.defaultProps = {
  accept: '*',
  single: false,
  deletedFiles: false
};
