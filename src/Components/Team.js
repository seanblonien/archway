import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import UserGrid from './UserGrid';

const styles = () => ({
  root: {
    paddingTop: '1%',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
});

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
    };
  }

  async componentDidMount() {
    const {capstone} = this.props;
    const team = capstone.members;
    this.setState({team});
  }

  render() {
    const {classes} = this.props;
    const {team} = this.state;

    return (
      <div className={classes.root}>
        <Typography style={{marginBottom: '10px'}} variant='h4'>Meet the Team</Typography>
        <UserGrid userList={team}/>
      </div>
    );
  }
}

Team.propTypes = {
  capstone: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(Team);
