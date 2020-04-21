import {withStyles, withTheme} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../utils/Routing/routes';
import history from '../utils/Routing/history';
import {imageURL, convertStrapiDate} from '../utils/utils';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class DepartmentCapstones extends Component {
  constructor(props) {
    super(props);
    const {department} = this.props;
    this.state = {
      departmentCapstones: department.capstones,
    };
  }

  async componentDidMount() {
    this.setState({departmentCapstones: this.getCurrentOrPastCapstones()});
  }

  getCurrentOrPastCapstones = () => {
    const {current} = this.props;
    const {departmentCapstones} = this.state;
    const datedCapstones = [];
    const today = new Date();

    for (const index in departmentCapstones) {
      if (Object.prototype.hasOwnProperty.call(departmentCapstones, index)) {
        const capstone = departmentCapstones[index];

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
    const {departmentCapstones} = this.state;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cellHeight={180} cols={1}>
          {departmentCapstones.map((result, i) => (
            <GridListTile
              style={{maxWidth: '300px', padding: '20px'}}
              key={departmentCapstones[i].thumbnail.url}
              onClick={() => this.handleTileClick(result.id)}
            >
              <img
                src={imageURL.capstone(departmentCapstones[i].thumbnail)}
                alt='Capstone' style={{height: '100%', width: '100%'}}
              />
              <GridListTileBar
                title={result.name}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    component={RouterLink}
                    to={`/ViewCapstone/${result.id}`}
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

DepartmentCapstones.propTypes = {
  department: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  current: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withTheme
)(DepartmentCapstones);
