import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class MainProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = event => {
    const {update} = this.props;
    const {target} = event;
    const {value} = target;
    const {name} = target;
    update(name, value);
  };

  render() {
    const {user} = this.props;

    return (
      <Box my={2}>
        <Typography variant='h4'>Main Settings</Typography>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='Fullname'
              label='Full name'
              margin='dense'
              style={{width: '100%'}}
              onChange={this.handleChange}
              value={user.Fullname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='email'
              label='Email'
              margin='dense'
              style={{width: '100%'}}
              onChange={this.handleChange}
              value={user.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='description'
              label='Bio'
              margin='dense'
              style={{width: '100%'}}
              multiline
              onChange={this.handleChange}
              value={user.description}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

MainProfileEdit.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
};

export default MainProfileEdit;
