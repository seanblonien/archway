import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {imageURL} from '../utils/utils';
import routes from '../utils/Routing/routes';
import history from '../utils/Routing/history';
import LoadingCircle from './LoadingCircle';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: '200px',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  text: {
    color: 'rgb(0, 0, 0)',
  },
});

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      team: [],
    };
  }

  async componentDidMount() {
    const {capstone} = this.props;
    const team = capstone.members;
    this.setState({loading: false, team});
  }

  handleTileClick = (title) => {
    history.push(routes.viewprofile.genPath(title));
  };

  render () {
    const {classes} = this.props;
    const {team, loading} = this.state;

    return loading ?
      <LoadingCircle/> :
      <Grid container direction='row' xs={11} className={classes.root}>
        <GridList item className={classes.gridList} cols={2.5}>
          {team.map((member) => (
            <div key={member.id} style={{marginRight: '20px'}}>
              <GridListTile
                onClick={() => this.handleTileClick(member.username)}
              >
                <img
                  src={imageURL.user(member.picture)}
                  alt='Team Member'
                  style={{height: '150px', width: '150px'}}
                />
              </GridListTile>
              <Typography className={classes.text}>{member.Fullname}</Typography>
            </div>
          ))}
        </GridList>
      </Grid>
    ;
  }
}

Team.propTypes = {
  capstone: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(Team);
