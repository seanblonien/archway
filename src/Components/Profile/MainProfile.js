import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {user} = this.props;

    return (
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
            <Typography style={{padding: '0px 0px 12px 0px'}}>Bio: </Typography>
            <Box border={1} borderRadius={12} padding={2}>
              <Markdown>{user.description? user.description : ''}</Markdown>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

MainProfile.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MainProfile;
