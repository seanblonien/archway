import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {imageURL} from '../../utils/utils';

const ResultCapstone = ({capstone}) => (
  <Paper>
    <Grid container>
      <Grid item>
        <img src={imageURL.capstone(capstone.thumbnail)} alt='Capstone'/>
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography variant='h5'>{capstone.name}</Typography>
        </Grid>
        <Grid item>
          <Typography>{capstone.preview}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

ResultCapstone.propTypes = {
  capstone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    preview: PropTypes.string,
    thumbnail: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired,
};

export default ResultCapstone;