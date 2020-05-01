import {Box} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {imageURL} from '../../utils/utils';
import './style.css';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'white',
  },
}));

export default function DragAndDrop({files, setFiles, accept, single, cols}) {
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    setFiles(single ? [acceptedFiles[0]] : [...files, ...acceptedFiles], false);
  }, [single, files, setFiles]);
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
        <Box my={1} component={GridList} cols={cols}>
          {files.map((file) => (
            <GridListTile key={file.name}>
              {file.id
                ? <img src={imageURL.capstone(file)} alt={file.name}/>
                : <img src={URL.createObjectURL(file)} alt={file.name}/>
              }
              <GridListTileBar
                title={file.name}
                actionIcon={
                  <IconButton
                    aria-label={`Delete ${file.name}`} onClick={() => (
                      setFiles(files.filter(f => f.name !== file.name))
                    )}
                  >
                    <DeleteIcon
                      className={classes.icon}

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
  files: PropTypes.arrayOf(PropTypes.shape(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
  accept: PropTypes.string,
  single: PropTypes.bool,
  cols: PropTypes.number
};

DragAndDrop.defaultProps = {
  accept: '*',
  single: false,
  cols: 3
};
