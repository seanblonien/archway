import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React from 'react';

const MainProfile = ({user}) => (
  <Box my={2}>
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
        <Box border={1} borderRadius={12} padding={2}>
          <Markdown>{user.description? user.description : ''}</Markdown>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

MainProfile.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string.isRequired, 
    email: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired
  }).isRequired,
};

export default MainProfile;
