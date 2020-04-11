import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const SponsorProfile = ({user}) => (
  <div>
    <Box my={2}>
      <Typography variant='h5'>{user.role.name} Info</Typography>
      <Divider/>
      <br/>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12}>
          <Typography>Organization: </Typography>
          <Typography>{user.sponsorOrganization && user.sponsorOrganization.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Job Title: </Typography>
          <Typography>{user.jobTitle}</Typography>
        </Grid>
      </Grid>
    </Box>
  </div>
);

SponsorProfile.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.shape({name: PropTypes.string.isRequired}).isRequired,
    sponsorOrganization: PropTypes.shape({name: PropTypes.string.isRequired}), 
    jobTitle: PropTypes.string.isRequired
  }).isRequired,
};

export default SponsorProfile;
