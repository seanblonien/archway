import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {user, edit} = this.props;

    return (
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
  }
}

ProfileHeader.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default ProfileHeader;
