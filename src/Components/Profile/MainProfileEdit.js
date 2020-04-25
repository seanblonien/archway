import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import MarkdownEditor from '../Markdown/MarkdownEditor';
import SubSectionTitle from '../Typography/SubsectionTitle';

const MainProfileEdit = ({user, update}) => {

  const handleChange = event => {
    update(event.target.name, event.target.value);
  };

  return (
    <>
      <SubSectionTitle>Main Settings</SubSectionTitle>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12}>
          <TextField
            name='Fullname'
            label='Full name'
            margin='dense'
            fullWidth
            onChange={handleChange}
            value={user.Fullname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='email'
            label='Email'
            margin='dense'
            fullWidth
            onChange={handleChange}
            value={user.email}
          />
        </Grid>
        <Grid item xs={12}>
          <MarkdownEditor
            uniqueName='bio'
            setValue={(value) => update('description', value)}
            value={user.description}
          />
        </Grid>
      </Grid>
    </>
  );
};


MainProfileEdit.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default MainProfileEdit;
