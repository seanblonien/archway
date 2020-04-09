import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

const EditButton = ({edit}) => (
  <Box my={2}>
    <Button variant='contained' onClick={edit}>
      Edit Profile
    </Button>
  </Box>
);


EditButton.propTypes = {
  edit: PropTypes.func.isRequired,
};

export default EditButton;
