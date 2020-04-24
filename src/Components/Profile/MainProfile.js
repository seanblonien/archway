import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import MediaMarkdown from '../Markdown/MediaMarkdown';
import SubSectionTitle from '../SubsectionTitle';

const MainProfile = ({user}) => (
  <>
    <SubSectionTitle>Personal Info</SubSectionTitle>
    <Grid container direction='row' spacing={2}>
      <Grid item xs={12}>
        <Typography>Name: </Typography>
        <Typography>{user.Fullname}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Email: </Typography>
        <Typography>{user.email}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Bio: </Typography>
        {user.description && <MediaMarkdown>{user.description}</MediaMarkdown>}
      </Grid>
    </Grid>
  </>
);

MainProfile.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
};

export default MainProfile;
