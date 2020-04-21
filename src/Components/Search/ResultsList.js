import {Box, Divider, Grid, GridList, GridListTile, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';
import ResultCapstone from './ResultCapstone';
import Filters from './Filters';

const styles = (theme) => ({
  paper:{
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    outline: 'none',
  },
});

class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capstones: [{
        id: '',
      }],
    };
    this.selectedDepartments = [];
    this.selectedSponsors = [];
  }

  async componentDidMount() {
    this.search();
  }

  updateDepartments = (departments) => {
    this.selectedDepartments = departments;
    this.search();
  };

  updateSponsors = (sponsors) => {
    this.selectedSponsors = sponsors;
    this.search();
  };

  search = async () => {
    const {query} = this.props;

    // Query the database for capstones with the query string, the selected departments, and the selected sponsors (OR operation)
    const [queryCapstones, departmentCapstones, sponsorCapstones] = await Promise.all([
      api.capstones.find({_q: query}), 
      api.capstones.find({departments: {id: this.selectedDepartments}}), 
      api.capstones.find({sponsors: {id: this.selectedSponsors}})
    ]);

    // Save only the ids from the queried capstones
    const qids = [];
    const dids = [];
    const sids = [];
    queryCapstones.map(qc => (qids.push(qc.id)));
    departmentCapstones.map(dc => (dids.push(dc.id)));
    sponsorCapstones.map(sc => (sids.push(sc.id)));

    // Find the ids that appear in all 3 lists (AND operation)
    const cids = qids.filter(value => dids.includes(value)).filter(value => sids.includes(value));

    // Find the capstones that satisfy all the criteria (find by ids)
    let results = [{id: '',}];
    if(cids.length > 0){
      results = await api.capstones.find({id_in: cids});
    }

    // Update the screen
    this.setState({capstones: results});
  };

  render() {
    const {classes, query} = this.props;
    const {capstones} = this.state;

    return (
      <Box>
        <Typography variant='h3' align='center'>Search results for &quot;{query}&quot;</Typography>
        <Divider variant = 'middle'/>
        <br/>
        <Grid container direction = 'row' spacing={2}>
          <Grid item xs={3}>
            <Filters departments={this.updateDepartments} sponsors={this.updateSponsors}/>
          </Grid>
          <Grid item xs={6}>
            <GridList cellHeight={160} className={classes.gridList} cols={1}>
              {capstones.map(capstone => (
                <GridListTile key={capstone.id}>
                  <ResultCapstone capstone={capstone}/>
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
      </Box>
    );
  }
}


ResultsList.propTypes = {
  query: PropTypes.string.isRequired,
};

export default withStyles(styles) (ResultsList);