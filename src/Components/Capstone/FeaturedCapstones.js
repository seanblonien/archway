import {Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import api from '../../Services/api';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import root from '../../utils/styles.module.css';
import {imageURL} from '../../utils/utils';
import LoadingCircle from '../LoadingCircle';
import {StyledLink} from '../Typography/StyledLink';

const styles = (theme) => ({
  pointer:{
    cursor: 'pointer'
  },
  featuredPaper:{
    background: theme.palette.secondary.main,
    color: 'black',
    marginTop: 30,
    marginLeft: 30,
    textAlign: 'center',
    height: 450,
    maxWidth: 600,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class FeaturedCapstones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      featuredCapstones: [],
    };
  }

  async componentDidMount() {
    const featuredCapstones = await api.capstones.find({isFeatured: true});
    this.setState({loading: false, featuredCapstones});
  }

  handleTileClick = (title) => {
    history.push(routes.viewcapstone.genPath(title));
  };

  render () {
    const {classes} = this.props;
    const {loading, featuredCapstones} = this.state;

    return loading ?
      <LoadingCircle/>
      :
      <Grid item xs={6} align='right'>
        <Paper className={classes.featuredPaper}>
          <Typography variant='h4'>Featured Capstones</Typography>
          <div className={root.gridListContainer}>
            <GridList cellHeight={180} cols={2}>
              {featuredCapstones.map((result, i) => (
                <GridListTile
                  style={{maxWidth: '300px'}}
                  key={result.id}
                  onClick={() => this.handleTileClick(result.id)}
                  className={classes.pointer}
                >
                  <img
                    src={imageURL.capstone(featuredCapstones[i].thumbnail)}
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
          <Typography>
            <StyledLink to={routes.capstones.path}>See More</StyledLink>
          </Typography>
        </Paper>
      </Grid>
    ;
  }
}

export default withStyles(styles)(FeaturedCapstones);
