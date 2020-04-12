import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './style.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function Accept(props) {
  const classes = useStyles();

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const [hasAccept, setAccept] = useState(false);

  while (acceptedFiles.length > 10) {
    acceptedFiles.shift();
  }


  if (acceptedFiles.length >= 1 && !hasAccept) {
    props.acceptImage(acceptedFiles);
    setAccept(true);
  }

  const files = acceptedFiles.map((tile, index) => (
    <GridListTile key={index}>
      <img className="dropzone-img" src={URL.createObjectURL(acceptedFiles[0])} alt={tile.name} />
      <GridListTileBar
        title={tile.name}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton aria-label={`star ${tile.name}`}>
            <DeleteIcon onClick={() => remove(tile.name)} className={classes.title} />
          </IconButton>
        }
      />
    </GridListTile>
  ));

  const remove = (title) => {
    console.log(title);
  };

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()}/>

      {acceptedFiles.length === 0 ?
        <div>
          <p>{props.prompt}</p>
        </div>
        :
        <div>
          {/*<img className='image-preview' src={URL.createObjectURL(acceptedFiles[0])} alt='Preview'/>*/}
          <GridList className={classes.gridList} cols={2.5}>
            {files}
          </GridList>
        </div>
      }
    </div>
  );
}

