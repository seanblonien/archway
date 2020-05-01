import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {SketchPicker} from 'react-color';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 'min-content'
  },
  label: {
    whiteSpace: 'nowrap'
  },
  colorDisplay: {
    width: 100,
    height: 100
  }
}));

const ColorPicker = ({color, setColor, resetColor, label}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Box component={Paper} p={2} className={classes.root}>
      <Typography variant='h5' className={classes.label}>{label}</Typography>

      <Box mt={1}>
        <Paper className={classes.colorDisplay} style={{backgroundColor: color}}/>
      </Box>
      {open &&
        <>
          <Box mt={2}>
            <SketchPicker
              color={color}
              onChange={(c) => setColor(c)}
            />
          </Box>
        </>
      }
      <Grid container component={Box} my={2} justify='space-between' alignItems='center'>
        <Grid item xs>
          <Button onClick={() => setOpen(!open)} variant='contained'>{open ? 'Close' : 'Edit'}</Button>
        </Grid>
        {open &&
          <Grid item xs>
            <Button onClick={resetColor} variant='contained'>Reset</Button>
          </Grid>
        }
      </Grid>
    </Box>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  resetColor: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default ColorPicker;
