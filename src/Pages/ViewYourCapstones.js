import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InfoIcon from '@material-ui/icons/Info';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import {imageURL} from '../utils/utils';
import api from '../Services/api';
import AuthContext from '../Contexts/AuthContext';
import LoadingCircle from '../Components/LoadingCircle';
import history from '../utils/Routing/history';

const styles = {
  card: {
    raised: true,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

class ViewYourCapstones extends Component {
  static getColumns(props) {
    if(props.width === 'xl') {
      return 4;
    }if(props.width === 'lg') {
      return 4;
    }if(props.width ==='md') {
      return 3;
    }

    return 2;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstones: [],
    };
  }


  async componentDidMount() {
    const {user} = this.context;
    // get capstones that are moderated by user
    const response = await api.users.findOne(user.id);
    this.setState({capstones: response.data.capstones});
  }

  handleDelete = async (e, resultID) => {
    const {user} = this.context;
    await api.capstones.delete(resultID);

    const userID = user.id;
    // get capstones that are moderated by user
    const response = await api.users.findOne(userID);
    this.setState({capstones: response.data.capstones});
    history.push('/');
  };

  handleTileClick = (title) => {
    history.push(`/ViewCapstone/${title}`);
  };

  render() {
    const {classes} = this.props;
    const {loading, capstones, participatedCapstones} = this.state;

    if (!loading) {
      return (
        <div>
          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Typography variant='h4' style={{marginTop: '16px'}}>Your Moderated Capstone Projects</Typography>
              <Divider/>
              <br/>
            </Grid>
          </Grid>

          <Grid container justify='center' style={{marginBottom: '16px'}}>
            <Grid item xs={12} md={10}>
              <GridList cellHeight={250} cols={ViewYourCapstones.getColumns(this.props)}>
                {capstones.map((result) => (
                  <GridListTile key={result.coverPhoto.url} onClick={() => this.handleTileClick(result.id)}>
                    <img src={imageURL.capstone(result.coverPhoto)} alt='Capstone' style={{height: '100%', width: '100%'}}/>

                    <GridListTileBar
                      title={result.title}
                      subtitle={`Made by: ${result.moderator.username}`}
                      actionIcon={
                        <Grid container>
                          <Grid item xs={3} style={{marginLeft: '2px'}}>
                            <IconButton
                              className={classes.icon}
                              component={Link}
                              to={`/ViewCapstone${result._id}`}
                            >
                              <InfoIcon/>
                            </IconButton>
                          </Grid>
                          <Grid item xs={3} style={{marginLeft: '2px'}}>
                            <IconButton
                              className={classes.icon}
                              component={Link}
                              to={`/EditCapstone${result._id}`}
                            >
                              <CreateIcon/>
                            </IconButton>
                          </Grid>
                          <Grid item xs={3} style={{marginLeft: '2px'}}>
                            <IconButton
                              className={classes.icon}
                              onClick={(e) => this.handleDelete(e, result.id)}
                              component={Link}
                              to={`/ViewYourCapstones${result._id}`}
                            >
                              <DeleteForeverIcon/>
                            </IconButton>
                          </Grid>
                        </Grid>

                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>


          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Typography variant='h4' style={{marginTop: '16px'}}>Your Participated Capstone Projects</Typography>
              <Divider/>
              <br/>
            </Grid>
          </Grid>

          <Grid container justify='center' style={{marginBottom: '16px'}}>
            <Grid item xs={12} md={10}>
              <GridList cellHeight={250} cols={ViewYourCapstones.getColumns(this.props)}>
                {participatedCapstones.map((result2) => (
                  <GridListTile key={result2.coverPhoto.url} onClick={() => this.handleTileClick(result2._id)}>
                    <img src={imageURL.capstone(result2.coverPhoto)} alt='Capstone' style={{height: '100%', width: '100%'}}/>
                    <GridListTileBar
                      title={result2.title}
                      subtitle={`Made by: ${result2.moderator.username}`}
                      actionIcon={
                        <div>
                          <Grid container>
                            <Grid xs={3}>
                              <IconButton
                                className={classes.icon}
                                component={Link}
                                to={`/ViewCapstone/${result2._id}`}
                              >
                                <InfoIcon/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </div>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

ViewYourCapstones.contextType = AuthContext;

export default compose(
  withStyles(styles),
  withWidth(),
)(ViewYourCapstones);
