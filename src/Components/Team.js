import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import routes from '../utils/Routing/routes';
import history from '../utils/Routing/history';
import {imageURL} from '../utils/utils';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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

  handleTileClick = (title) => {
    history.push(routes.viewprofile.genPath(title));
  };

  render() {
    const {classes} = this.props;
    const {team} = this.state;

    return (
      <div className={classes.root}>
        <Typography style={{marginBottom: '10px'}} variant='h4'>Meet the Team</Typography>
        <GridList className={classes.gridList} cols={6}>
          {team.map((member) => (
            <div style={{height: '200px', width: '200px'}}>
              <GridListTile
                key={member.id} cols={2}
                style={{height: '150px', width: '150px', paddingRight: '2%', paddingTop: '2%'}}
                onClick={() => this.handleTileClick(member.username)}
              >
                <img src={imageURL.user(member.picture)} alt=''/>
              </GridListTile>
              <Typography variant='body2'>{member.Fullname}</Typography>
              <Typography variant='body2'>{member.email}</Typography>
            </div>
          ))}
        </GridList>
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
