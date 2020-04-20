import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    display: 'none',
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

export default function DragAndDropMultipleZone({id, acceptImage}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const remove = (name) => {
    setFiles(files.filter((t) => name !== t.name));
  };

  const handleImg = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()}/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      }
    </div>
  );
  // return (
  //   <Grid container alignItems='center' justify='center' spacing={1}>
  //     <Grid item xs={12}>
  //       <input
  //         accept='image/*'
  //         className={classes.input}
  //         id={props.prompt}
  //         multiple
  //         type='file'
  //         onChange={handleImg}
  //       />
  //       <label htmlFor={props.prompt}>
  //         <Button variant='contained' color='primary' component='span' fullWidth>
  //           Upload
  //         </Button>
  //       </label>
  //     </Grid>
  //
  //     <Grid item xs={12}>
  //       <GridList className={classes.gridList} cols={2.5}>
  //         {files.map((file) => (
  //           <GridListTile key={file.name}>
  //             <img src={URL.createObjectURL(file)} alt='Preview'/>
  //             <GridListTileBar
  //               title={file.name}
  //               classes={{
  //                 root: classes.titleBar,
  //                 title: classes.title,
  //               }}
  //               actionIcon={
  //                 <IconButton aria-label={`star ${file.name}`}>
  //                   <DeleteIcon onClick={() => remove(file.name)} className={classes.title}/>
  //                 </IconButton>
  //               }
  //             />
  //           </GridListTile>
  //         ))}
  //       </GridList>
  //     </Grid>
  //   </Grid>
  // );
}
