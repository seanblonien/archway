import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import MediaMarkdown from '../Markdown/MediaMarkdown';

const MainProfile = ({user}) => (
  <Box my={2}>
    <Typography variant='h5'>Personal Info</Typography>
    <Divider/>
    <br/>
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
  </Box>
);

MainProfile.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
};

export default MainProfile;
