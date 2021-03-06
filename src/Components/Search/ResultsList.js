import {Box, Divider, Grid, GridList, GridListTile, TextField, Typography} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
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
  }
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
      this.setState({input: searchTerm});
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

  clearSearch = () => {
    this.setState({input: ''});
  }

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
    const [queryCapstones, departments, sponsorCapstones] = await Promise.all([
      api.capstones.find({_q: searchTerm}),
      api.departments.find({id_in: this.selectedDepartments}),
      api.capstones.find({sponsors: {id: this.selectedSponsors}})
    ]);

    // Save only the ids from the queried capstones
    const qids = queryCapstones.map(qc => qc.id);
    const dids = departments.map(department => department.capstones.map(dc => dc.id)).reduce((obj, elem) => {
      obj.push(...elem);
      return obj;
    }, []);
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
        <Box width='50%' mx='auto' my={1}>
          <form onSubmit={this.newSearch}>
            <TextField
              margin='dense'
              placeholder='Search...'
              fullWidth
              onChange={this.handleChange}
              value={input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon className={classes.pointer} onClick={this.newSearch}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {input.length > 0 &&
                      <ClearIcon className={classes.pointer} onClick={this.clearSearch}/>
                    }
                  </InputAdornment>
                )
              }}
            />
          </form>
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
