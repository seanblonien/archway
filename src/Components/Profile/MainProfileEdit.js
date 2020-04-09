import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const MainProfileEdit = ({user, update}) => {

  const handleChange = event => {
    update(event.target.name, event.target.value);
  };

  return (
    <Box my={2}>
      <Typography variant='h4'>Main Settings</Typography>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12}>
          <TextField
            name='Fullname'
            label='Full name'
            margin='dense'
            fullWidth
            onChange={handleChange}
            value={user.Fullname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='email'
            label='Email'
            margin='dense'
            fullWidth
            onChange={handleChange}
            value={user.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='description'
            label='Bio'
            margin='dense'
            fullWidth
            multiline
            onChange={handleChange}
            value={user.description}
          />
        </Grid>
      </Grid>
    </Box>
  );
};


MainProfileEdit.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string.isRequired, 
    email: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default MainProfileEdit;
