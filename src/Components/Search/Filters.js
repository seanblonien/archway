import {Box, Checkbox, Collapse, Divider, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';


class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [{
        id: '',
        name: '',
      }],
      sponsors: [{
        id: '',
        name: '',
      }],
      departmentsOpen: true,
      sponsorsOpen: true,
      checkedDepartments: new Set(),
      checkedSponsors: new Set(),
    };
  }

  async componentDidMount() {
    const departments = await api.departments.find();
    const sponsors = await api.sponsors.find();
    this.setState({departments, sponsors});
  }

  handleDepartmentsOpen = () => {
    const {departmentsOpen} = this.state;
    this.setState({departmentsOpen: !departmentsOpen});
  };

  handleSponsorsOpen = () => {
    const {sponsorsOpen} = this.state;
    this.setState({sponsorsOpen: !sponsorsOpen});
  };

  handleDepartmentsCheckboxClick = (event) =>{
    const {departments} = this.props;
    const {checkedDepartments} = this.state;
    const item = event.target.name;
    if(event.target.checked){
      checkedDepartments.add(item);
    } else {
      checkedDepartments.delete(item);
    }
    this.setState({checkedDepartments});
    departments(Array.from(checkedDepartments));
  };

  handleSponsorsCheckboxClick = (event) =>{
    const {sponsors} = this.props;
    const {checkedSponsors} = this.state;
    const item = event.target.name;
    if(event.target.checked){
      checkedSponsors.add(item);
    } else {
      checkedSponsors.delete(item);
    }
    this.setState({checkedSponsors});
    sponsors(Array.from(checkedSponsors));
  };

  render() {
    const {departments, sponsors, departmentsOpen, sponsorsOpen, checkedDepartments, checkedSponsors} = this.state;

    return (
      <Box mx={5}>
        <Paper variant='outlined'>
          <Typography variant='h6' align='center'>Limit Search Results</Typography>
          <Divider variant='middle'/>
          <List>
            <ListItem button onClick={this.handleDepartmentsOpen}>
              <ListItemText primary='Departments'/>
              {departmentsOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={departmentsOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {departments.map(department => (
                  <ListItem key={department.id}>
                    <Checkbox name={department.id} checked={checkedDepartments.has(department.id)} onChange={this.handleDepartmentsCheckboxClick}/>
                    <ListItemText primary={department.name}/>
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem button onClick={this.handleSponsorsOpen}>
              <ListItemText primary='Sponsors'/>
              {sponsorsOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={sponsorsOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {sponsors.map(sponsor => (
                  <ListItem key={sponsor.id}>
                    <Checkbox name={sponsor.id} checked={checkedSponsors.has(sponsor.id)} onChange={this.handleSponsorsCheckboxClick}/>
                    <ListItemText primary={sponsor.name}/>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Paper>
      </Box>
    );
  }
}


ResultsList.propTypes = {
  departments: PropTypes.func.isRequired,
  sponsors: PropTypes.func.isRequired
};

export default ResultsList;