import {Box, Divider, Grid, GridList, GridListTile, TextField, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import _ from 'lodash';
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
      input: props.query,
    };
    this.selectedDepartments = [];
    this.selectedSponsors = [];
  }

  async componentDidMount() {
    const {searchTerm} = this.state;
    await this.search(searchTerm);
  }

  async componentDidUpdate (prevProps) {
    await this.updateQuery(prevProps);
  }

  updateQuery = async (prevProps) => {
    const {query: searchTerm} = this.props;
    if(prevProps.query !== searchTerm) {
      this.setState({searchTerm});
      await this.search(searchTerm);
    }
  };

  handleChange = event => {
    this.setState({input: event.target.value});
  };

  newSearch = event => {
    const {input} = this.state;

    if(input.length > 0){
      const term = formatQuery({search: input});

      history.push(routes.search.genPath(term));
      
      this.setState({searchTerm: input});
    }

    event.preventDefault();
  };

  updateDepartments = async (departments) => {
    this.selectedDepartments = departments;
    const {searchTerm} = this.state;
    await this.search(searchTerm);
  };

  updateSponsors = async (sponsors) => {
    this.selectedSponsors = sponsors;
    const {searchTerm} = this.state;
    await this.search(searchTerm);
  };

  search = async (searchTerm) => {
    // Query the database for capstones with the query string, the selected departments, and the selected sponsors (OR operation)
    const [queryCapstones, departmentCapstones, sponsorCapstones] = await Promise.all([
      api.capstones.find({_q: searchTerm}),
      api.capstones.find({departments: {id: this.selectedDepartments}}),
      api.capstones.find({sponsors: {id: this.selectedSponsors}})
    ]);

    // Save only the ids from the queried capstones
    const qids = queryCapstones.map(qc => qc.id);;
    const dids = departmentCapstones.map(dc => dc.id);
    const sids = sponsorCapstones.map(sc => sc.id);

    // Find the ids that appear in all 3 lists (AND operation)
    const cids = qids.filter(value => dids.includes(value) && sids.includes(value));

    // Find the capstones that satisfy all the criteria (find by ids)
    let capstones = [];
    if(!_.isEmpty(cids)){
      capstones = await api.capstones.find({id_in: cids});
    }

    // Update the screen
    this.setState({capstones});
  };

  render() {
    const {classes} = this.props;
    const {capstones, input} = this.state;

    return (
      <Box>
        <Box width='50%' mx='auto'>
          <Grid container direction='row' alignItems='center'>
            <Grid item xs={11}>
              <form onSubmit={this.newSearch}>
                <TextField
                  name='query'
                  margin='dense'
                  placeholder='Search...'
                  fullWidth
                  onChange={this.handleChange}
                  value={input}
                  type='search'
                />
              </form>
            </Grid>
            <Grid item xs={1}>
              <SearchIcon className={classes.pointer} onClick={this.newSearch}/>
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
