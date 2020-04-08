import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

class NativeSelects extends Component {
  constructor (props) {
    super(props);

    this.state = {
      department: '',
      sponsor: '',
      capstones: [],
      departmentList: [],
      sponsorList: [],
    };
  }

  async componentDidMount() {
    const capstones = await api.capstones.find();
    const sponsorList = capstones.filter(capstone => !_.isEmpty(capstone.sponsors))
      .flatMap(capstone => capstone.sponsors)
      .map(s => s.name);
    const departmentList = capstones.filter(capstone => !_.isEmpty(capstone.department))
      .flatMap(capstone => capstone.department)
      .map(d => d.name);

    this.setState({capstones, sponsorList, departmentList});
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    history.push(routes.searchredirect.genPath('Capstones', event.target.value));
  };

  render() {
    const {classes} = this.props;
    const {department, departmentList, sponsor, sponsorList, capstones} = this.state;
    // TODO use capstones
    capstones.filter(() => true);

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='age-native-simple'>Department</InputLabel>
            <Select
              native
              value={department}
              onChange={this.handleChange('department')}
            >
              <option value=''/>
              {departmentList.map(name => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='age-native-simple'>Sponsor</InputLabel>
            <Select
              native
              value={sponsor}
              onChange={this.handleChange('sponsor')}
            >
              <option value=''/>
              {sponsorList.map(name => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(NativeSelects);
