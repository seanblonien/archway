import {Box, Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';
import ResultCapstone from './ResultCapstone';
import Filters from './Filters';


class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capstones: [{
        id: '',
      }],
      selectedDepartments: new Set(),
      selectedSponsors: new Set(),
    };
  }

  async componentDidMount() {
    const {query} = this.props;

    const capstones = await api.capstones.find({_q: query, _limit: 3});

    this.setState({capstones});
  }

  updateDepartments = (departments) => {
    this.setState({selectedDepartments: departments});
    this.search();
  };

  updateSponsors = (sponsors) => {
    this.setState({selectedSponsors: sponsors});
    this.search();
  };

  search = async () => {
    const {query} = this.props;
    const {selectedDepartments, selectedSponsors} = this.state;

    const capstones = await api.capstones.find({_q: query, _limit: 3});
    this.setState({capstones});
  };

  render() {
    const {query} = this.props;
    const {capstones} = this.state;

    return (
      <Box>
        <Typography variant='h3'>Search results for {query}</Typography>
        <Grid container direction = 'row' spacing={2}>
          <Grid item xs={4}>
            <Filters departments={this.updateDepartments} sponsors={this.updateSponsors}/>
          </Grid>
          <Grid item xs={8}>
            {capstones.map(capstone => (
              <ResultCapstone key={capstone.id} capstone={capstone}/>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}


ResultsList.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ResultsList;