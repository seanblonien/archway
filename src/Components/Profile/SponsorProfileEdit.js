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
import {permissions} from "../../constants";
import SponsorForm from "../SponsorForm";
import Can from "../Can";

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
    update(event.target.name, event.target.value);
  };

  render() {
    const {user} = this.props;
    const {sponsors} = this.state;

    return (
      <div>
        <Box my={2}>
          <Typography variant='h5'>{user.role.name} Settings</Typography>
          <Divider/>
          <br/>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={12}>
              <InputLabel id='sponsor-organization-select-label'>Organization</InputLabel>
              <Select
                name='sponsorOrganization'
                labelId='sponsor-organization-select-label'
                margin='dense'
                fullWidth
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
            <Can perform={permissions.application.sponsors.create}>
              <SponsorForm title='Create New Sponsor' type='create'/>
            </Can>
            <Grid item xs={12}>
              <TextField
                name='jobTitle'
                label='Job Title'
                margin='dense'
                fullWidth
                onChange={this.handleChange}
                value={user.jobTitle}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

SponsorProfileEdit.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.shape({name: PropTypes.string.isRequired}).isRequired,
    sponsorOrganization: PropTypes.shape({name: PropTypes.string.isRequired}),
    jobTitle: PropTypes.string
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default SponsorProfileEdit;
