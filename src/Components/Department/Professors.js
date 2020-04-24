import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import api from '../../Services/api';
import UserGrid from '../Capstone/UserGrid';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'initial',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  text: {
    color: 'rgb(0, 0, 0)',
  },
});

class Professors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors: [],
    };
  }

  async componentDidMount() {
    const {department} = this.props;
    const professors = await api.users.find({department: {id: department.id}});
    this.setState({professors});
  }

  render () {
    const {classes} = this.props;
    const {professors} = this.state;

    return (
      <div className={classes.root}>
        {professors[0] &&
          <div>
            <Typography variant='h4' style={{marginBottom: '5%'}}>Professors</Typography>
            <UserGrid userList={professors}/>
          </div>
        }
      </div>
    );
  }
}

Professors.propTypes = {
  department: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(Professors);
