import Box from '@material-ui/core/Box';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import UserGrid from './UserGrid';

const Team = ({capstone}) => {
  const {members} = capstone;

  return (
    <Box my={1}>
      <Typography variant='h4'>Meet the Team</Typography>
      <UserGrid userList={members}/>
    </Box>
  );
};

Team.propTypes = {
  capstone: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default Team;
