import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const ProfileHeader = ({user, edit}) => (
  <Grid container direction='row' justify='space-between' alignItems='flex-end'>
    <Grid item xs={10}>
      {(edit) ?
        (
          <Typography variant='h4' align='left'>Profile Settings</Typography>
        ) :
        (
          <Typography variant='h4' align='left'>Profile: {user.Fullname}</Typography>
        )
      }
    </Grid>
    <Grid item xs={2}>
      <Typography align='right'>{user.role.name}</Typography>
    </Grid>
  </Grid>
);

ProfileHeader.propTypes = {
  user: PropTypes.shape({Fullname: PropTypes.string.isRequired, role: PropTypes.shape({name: PropTypes.string.isRequired})}).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default ProfileHeader;
