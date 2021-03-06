import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

const CancelSubmit = ({cancel, submit}) => (
  <Box my={2}>
    <Grid container direction='row' justify='space-between' spacing={2}>
      <Grid item>
        <Button variant='contained' onClick={cancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant='contained' onClick={submit}>
          Update Profile
        </Button>
      </Grid>
    </Grid>
  </Box>
);

CancelSubmit.propTypes = {
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default CancelSubmit;
