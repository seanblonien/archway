import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const ProfileHeader = ({user, edit}) => (
  <Box mt={2}>
    <Grid container direction='row' justify='space-between' alignItems='flex-end' spacing={2}>
      <Grid item xs={10}>
        {(edit) ?
          (
            <Typography variant='h3' align='left'>Profile Settings</Typography>
          ) :
          (
            <Typography variant='h3' align='left'>Profile: {user.Fullname}</Typography>
          )
        }
      </Grid>
      <Grid item xs={2}>
        <Typography align='right'>{user.role.name}</Typography>
      </Grid>
    </Grid>
  </Box>
);

ProfileHeader.propTypes = {
  user: PropTypes.shape({Fullname: PropTypes.string.isRequired, role: PropTypes.shape({name: PropTypes.string.isRequired})}).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default ProfileHeader;
