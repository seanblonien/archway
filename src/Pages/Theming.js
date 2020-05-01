/* eslint-disable no-await-in-loop */
import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import {useSnackbar} from 'notistack';
import React, {useContext, useEffect, useState} from 'react';
import ColorPicker from '../Components/ColorPicker';
import DragAndDrop from '../Components/DragAndDropZone/DragAndDrop';
import GridBox from '../Components/LayoutWrappers/GridBox';
import SectionTitle from '../Components/Typography/SectionTitle';
import {ThemeContext} from '../Contexts/ThemeProvider';
import api from '../Services/api';
import {snack} from '../utils/Snackbar';
import {formatEntryUpload} from '../utils/utils';

const initState = {
  universityName: '',
  primaryColor: '',
  secondaryColor: '',
  backgroundColor: '',
  errorColor: '',
  activeColor: '',
  hoverColor: '',
  selectedColor: '',
  logo: []
};

const colorFields = [
  {
    label: 'Primary Color',
    color: 'primaryColor',
  },
  {
    label: 'Secondary Color',
    color: 'secondaryColor',
  },
  {
    label: 'Background Color',
    color: 'backgroundColor',
  },
  {
    label: 'Error Color',
    color: 'errorColor',
  },
  {
    label: 'Active Color',
    color: 'activeColor',
  },
  {
    label: 'Hover Color',
    color: 'hoverColor',
  },
  {
    label: 'Selected Color',
    color: 'selectedColor',
  }
];

const useStyles = makeStyles(() => ({
  textField: {
    width: 'max-content'
  },
  upload: {
    minWidth: '300px'
  }
}));

const Theming = () => {
  const classes = useStyles();
  const [currentTheme, setCurrentTheme] = useState(initState);
  const {theme: globalTheme, setTheme: setGlobalTheme} = useContext(ThemeContext);
  const [themeHistory, setThemeHistory] = useState([]);
  const [files, setFiles] = useState([]);
  const {enqueueSnackbar} = useSnackbar();

  const reset = useEffect( () => {
    setCurrentTheme(globalTheme);
    setFiles(globalTheme.logo ? [globalTheme.logo] : []);
  }, [globalTheme]);

  const updateTheme = async () => {
    if(!_.isEqual(currentTheme, globalTheme) || !_.isEqual(files[0], globalTheme.logo)) {
      try {
        const tempTheme = {...currentTheme};

        if(files[0] instanceof File) {
          const upload = formatEntryUpload(files[0], 'theme', currentTheme.id, 'logo');
          await api.uploads.upload(upload);
        }
        if(_.isEmpty(files) && currentTheme.logo) {
          await api.uploads.delete(currentTheme.logo.id);
        }
        delete tempTheme.logo;
        const response = await api.theme.updateOne(tempTheme);
        setThemeHistory([...themeHistory, globalTheme]);
        setGlobalTheme(response.data);
        enqueueSnackbar('Theme updated successfully!', snack.success);
      } catch(e) {
        console.error(e);
        enqueueSnackbar('Theme update failed', snack.error);
      }
    }
  };

  const undoTheme = async () => {
    try {
      const lastTheme = themeHistory.pop();
      if(!lastTheme.logo) delete lastTheme.logo;
      const response = await api.theme.updateOne(lastTheme);
      enqueueSnackbar('Theme undone successfully!', snack.success);
      setGlobalTheme(response.data);
    } catch(e) {
      enqueueSnackbar('Theme undo failed', snack.error);
    }
  };

  return (
    <GridBox>
      <SectionTitle>Customize Theming</SectionTitle>
      <Grid container component={Box} spacing={2}>
        <Grid item xs={6} md={5} lg={3} xl={2}>
          <Box component={Paper} p={2}>
            <TextField
              autoFocus
              label='University Name'
              value={currentTheme.universityName}
              onChange={(event) => setCurrentTheme({...currentTheme, universityName: event.target.value})}
              fullWidth
              style={{wordWrap: 'normal'}}
              className={classes.textField}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Box component={Paper} p={2} className={classes.upload}>
            <Box pb={1} component={Typography} variant='h5'>
              Logo
            </Box>
            <DragAndDrop
              files={files}
              setFiles={(f) => setFiles(f)}
              cols={1}
              single
            />
          </Box>
        </Grid>
        {colorFields.map(({label, color}) => (
          <Grid item xs={12} sm={6} md key={color}>
            <ColorPicker
              label={label}
              color={currentTheme[color]}
              setColor={(c) => setCurrentTheme({...currentTheme, [color]: c.hex})}
              resetColor={() => setCurrentTheme({...currentTheme, [color]: globalTheme[color]})}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container component={Box} pt={2} spacing={1}>
        <Grid item xs={2}>
          <Button onClick={reset} variant='contained'>Reset All</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={undoTheme} variant='contained' disabled={_.isEmpty(themeHistory)}>Undo Theme</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={updateTheme} variant='contained' color='primary'>Update Theme</Button>
        </Grid>
      </Grid>
    </GridBox>
  );
};

export default Theming;
