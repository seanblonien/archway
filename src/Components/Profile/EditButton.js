import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class SponsorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {edit} = this.props;

    return (
      <Box my={2}>
        <Button variant='contained' onClick={edit}>
          Edit Profile
        </Button>
      </Box>
    );
  }
}

SponsorProfile.propTypes = {
  edit: PropTypes.func.isRequired,
};

export default SponsorProfile;
