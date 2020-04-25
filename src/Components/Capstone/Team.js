import PropTypes from 'prop-types';
import React from 'react';
import SectionTitle from '../Typography/SectionTitle';
import UserGrid from './UserGrid';

const Team = ({capstone}) => {
  const {members} = capstone;

  return (
    <div>
      <SectionTitle>Meet the Team</SectionTitle>
      <UserGrid userList={members}/>
    </div>
  );
};

Team.propTypes = {
  capstone: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default Team;
