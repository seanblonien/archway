import {Box, Divider, Grid, GridList, GridListTile, TextField, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';
import ResultCapstone from './ResultCapstone';
import Filters from './Filters';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import {formatQuery} from '../../utils/utils';

const styles = () => ({
  pointer:{
    cursor: 'pointer'
  },
});

class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capstones: [],
      searchTerm: props.query,
    };
    this.selectedDepartments = [];
    this.selectedSponsors = [];
  }

  async componentDidMount() {
    this.search();
  }

  handleChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  keyPress = e => {
    // If the enter key is pressed
    const {searchTerm} = this.state;
    const term = formatQuery({search: searchTerm});
    if(e.keyCode === 13) {
      history.push(routes.search.genPath(term));
    }
  };

  searchButtonClick = () => {
    const {searchTerm} = this.state;
    const term = formatQuery({search: searchTerm});
    history.push(routes.search.genPath(term));
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
    const {searchTerm} = this.state;

    // Query the database for capstones with the query string, the selected departments, and the selected sponsors (OR operation)
    const [queryCapstones, departmentCapstones, sponsorCapstones] = await Promise.all([
      api.capstones.find({_q: searchTerm}), 
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
    let results = [];
    if(cids.length > 0){
      results = await api.capstones.find({id_in: cids});
    }

    // Update the screen
    this.setState({capstones: results});
  };

  render() {
    const {classes} = this.props;
    const {capstones, searchTerm} = this.state;

    return (
      <Box>
        <Box width='50%' mx='auto'>
          <Grid container direction='row' alignItems='center'>
            <Grid item xs={11}>
              <TextField
                name='query'
                margin='dense'
                placeholder='Search...'
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.keyPress}
                value={searchTerm}
              />
            </Grid>
            <Grid item xs={1}>
              <SearchIcon className={classes.pointer} onClick={this.searchButtonClick}/>
            </Grid>
          </Grid>
        </Box>
        <Divider variant = 'middle'/>
        <br/>
        <Grid container direction = 'row' spacing={2}>
          <Grid item xs={3}>
            <Filters departments={this.updateDepartments} sponsors={this.updateSponsors}/>
          </Grid>
          <Grid item xs={6}>
            {capstones.length > 0 ?
              <GridList cellHeight={160} className={classes.gridList} cols={1}>
                {capstones.map(capstone => (
                  <GridListTile key={capstone.id}>
                    <ResultCapstone capstone={capstone}/>
                  </GridListTile>
                ))}
              </GridList> :
              <Typography variant='h6' align='center'>Sorry, your query didn&apos;t return any results...</Typography>
            }
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