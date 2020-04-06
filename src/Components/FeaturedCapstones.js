import {Link, Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import history from '../utils/history';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import gStyle from '../utils/styles.module.css';

class FeaturedCapstones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      featuredCapstones: [],
    };
  }

  async componentDidMount() {
    const capstones = await api.capstones.find();
    const featuredCapstones = capstones.filter(capstone => capstone.isFeatured);
    this.setState({loading: false, featuredCapstones});
  }

  handleTileClick = (title) => {
    history.push(`/ViewCapstone/${title}`);
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
          <div className={gStyle.gridListContainer}>
            <GridList cellHeight={180} cols={2}>
              {featuredCapstones.map((result, i) => (
                <GridListTile
                  style={{maxWidth: '300px'}}
                  key={featuredCapstones[i].coverPhoto.url}
                  onClick={() => this.handleTileClick(result.id)}
                >
                  <img
                    src={imageURL.capstone(featuredCapstones[i].coverPhoto)}
                    alt='Capstone' style={{height: '100%', width: '100%'}}
                  />
                  <GridListTileBar
                    title={result.title}
                    subtitle={`Made by: ${result.moderator.username}`}
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
          <Link component={RouterLink} to='/Capstones'>See More</Link>
        </Paper>
      </Grid>
    ;
  }
}

export default FeaturedCapstones;
