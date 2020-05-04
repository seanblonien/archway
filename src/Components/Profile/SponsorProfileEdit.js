import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {permissions} from '../../constants';
import api from '../../Services/api';
import Can from '../Can';
import SponsorForm from '../Sponsor/SponsorForm';
import SubSectionTitle from '../Typography/SubsectionTitle';

class SponsorProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors: [],
    };
  }

  async componentDidMount() {
    // Get the list of sponsors
    this.updateListOfSponsors();
  }

  updateListOfSponsors = async () => {
    const sponsors = await api.sponsors.find({});
    this.setState({sponsors});
  };

  handleChange = event => {
    const {update} = this.props;
    update(event.target.name, event.target.value);
  };

  render() {
    const {user} = this.props;
    const {sponsors} = this.state;

    return (
      <>
        <SubSectionTitle>{user.role.name} Settings</SubSectionTitle>
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
                <MenuItem key={sponsor.id} value={sponsor}>
                  {sponsor.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Can perform={permissions.application.sponsors.create} role={user.role.name}>
            <SponsorForm title='Create New Sponsor' type='create' update={this.updateListOfSponsors}/>
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
      </>
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
