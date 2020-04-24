import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import SubSectionTitle from '../SubsectionTitle';

const SponsorProfile = ({user}) => (
  <>
    <SubSectionTitle>{user.role.name} Info</SubSectionTitle>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Organization: </Typography>
        <Typography>{user.sponsorOrganization && user.sponsorOrganization.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Job Title: </Typography>
        <Typography>{user.jobTitle}</Typography>
      </Grid>
    </Grid>
  </>
);

SponsorProfile.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.shape({name: PropTypes.string.isRequired}).isRequired,
    sponsorOrganization: PropTypes.shape({name: PropTypes.string.isRequired}),
    jobTitle: PropTypes.string
  }).isRequired,
};

export default SponsorProfile;
