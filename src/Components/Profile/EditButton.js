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
    const {canEdit, edit} = this.props;

    return (
      <div>
        {canEdit &&
          <Box my={2}>
            <Button variant='contained' onClick={edit}>
              Edit Profile
            </Button>
          </Box>
        }
      </div>
    );
  }
}

SponsorProfile.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
};

export default SponsorProfile;
