import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {permissions} from '../../constants';
import Can from '../Can';

class SponsorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {user} = this.props;

    return (
      <Can perform={permissions.application.proposals.create} role={user.role.name}>
        <div>
          <Divider/>
          <Box my={2}>
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
      </Can>
    );
  }
}

SponsorProfile.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SponsorProfile;
