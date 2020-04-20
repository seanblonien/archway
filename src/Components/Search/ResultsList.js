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
                <GridListTile>
                  <ResultCapstone key={capstone.id} capstone={capstone}/>
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