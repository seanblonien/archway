import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles, withTheme} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import compose from 'recompose/compose';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import {convertStrapiDate, imageURL} from '../../utils/utils';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    transform: 'translateZ(0)',
    overflow: 'auto',
    maxHeight: '400px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class CapstonesList extends Component {
  constructor(props) {
    super(props);
    const {capstones} = this.props;
    this.state = {
      capstoneList: capstones,
    };
  }

  async componentDidMount() {
    this.setState({capstoneList: this.getCurrentOrPastCapstones()});
  }

  getCurrentOrPastCapstones = () => {
    const {current} = this.props;
    const {capstoneList} = this.state;
    const datedCapstones = [];
    const today = new Date();

    for (const index in capstoneList) {
      if (Object.prototype.hasOwnProperty.call(capstoneList, index)) {
        const capstone = capstoneList[index];

        const endDate = convertStrapiDate(capstone.endDate);
        if (current === 'True' && endDate >= today) {
          datedCapstones.push(capstone);
        }
        else if (current === 'False' && endDate < today) {
          datedCapstones.push(capstone);
        }
      }
    }
    return datedCapstones;
  }

  handleTileClick = (title) => {
    history.push(routes.viewcapstone.genPath(title));
  };

  render () {
    const {classes} = this.props;
    const {capstoneList} = this.state;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cellHeight={180} cols={2}>
          {capstoneList.map((result, i) => (
            <GridListTile
              style={{maxWidth: '300px', padding: '10px'}}
              key={capstoneList[i].id}
              onClick={() => this.handleTileClick(result.id)}
            >
              <img
                src={imageURL.capstone(capstoneList[i].thumbnail)}
                alt='Capstone' style={{height: '100%', width: '100%'}}
              />
              <GridListTileBar
                title={result.name}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    component={RouterLink}
                    to={routes.viewcapstone.genPath(result.id)}
                  >
                    <InfoIcon/>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

CapstonesList.propTypes = {
  capstones: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  current: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(CapstonesList);
