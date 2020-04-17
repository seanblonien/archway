import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {imageURL} from '../utils/utils';
import api from '../Services/api';

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
        <GridList className={classes.gridList} cols={1}>
          {professors.map((result, i) => (
            <div
              key={professors[i].picture.url}
              style={{paddingLeft: '30px'}}
            >
              <GridListTile
                onClick={() => this.handleTileClick(result.id)}
              >
                <img
                  src={imageURL.user(professors[i].picture)}
                  alt='Professor'
                  style={{height: '100%', width: '150px'}}
                />
              </GridListTile>
              <Typography className={classes.text}>{result.fullname}</Typography>
            </div>
          ))}
        </GridList>
      </div>
    );
  }
}

Professors.propTypes = {
  department: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(Professors);
