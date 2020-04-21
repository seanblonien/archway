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
  },
});

class UserGrid extends Component {

  handleTileClick = (title) => {
    history.push(routes.viewprofile.genPath(title));
  };

  render() {
    const {classes, userList} = this.props;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6}>
          {userList.map((user) => (
            <div
              style={{height: '200px', width: '200px'}}
              key={user.id}
            >
              <GridListTile
                cols={2}
                style={{height: '150px', width: '150px', paddingRight: '2%', paddingTop: '2%'}}
                onClick={() => this.handleTileClick(user.username)}
              >
                <img src={imageURL.user(user.picture)} alt=''/>
              </GridListTile>
              <Typography variant='body2'>{user.Fullname}</Typography>
              <Typography variant='body2'>{user.email}</Typography>
            </div>
          ))}
        </GridList>
      </div>
    );
  }
}

UserGrid.propTypes = {
  userList: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(UserGrid);
