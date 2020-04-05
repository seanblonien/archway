import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';
import {permissions} from '../../constants';
import Can from '../Can';

class SponsorProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors: [],
    };
  }

  async componentDidMount() {
    // Get the list of sponsors
    const sponsors = await api.sponsors.find({});
    this.setState({sponsors});
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
    const {sponsors} = this.state;

    return (
      <Can perform={permissions.application.proposals.create} role={user.role.name}>
        <div>
          <Divider/>
          <Box my={2}>
            <Typography variant='h4'>Sponsor Settings</Typography>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12}>
                <InputLabel id='sponsor-organization-select-label'>Organization</InputLabel>
                <Select
                  name='sponsorOrganization'
                  labelId='sponsor-organization-select-label'
                  margin='dense'
                  style={{width: '100%'}}
                  onChange={this.handleChange}
                  value={user.sponsorOrganization}
                >
                  {sponsors.map(sponsor => (
                    <option key={sponsor.id} value={sponsor}>
                      {sponsor.name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='jobTitle'
                  label='Job Title'
                  margin='dense'
                  style={{width: '100%'}}
                  onChange={this.handleChange}
                  value={user.jobTitle}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Can>
    );
  }
}

SponsorProfileEdit.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
};

export default SponsorProfileEdit;
