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
import LoadingCircle from '../Components/LoadingCircle';
import {strapi, strapiURL} from '../constants';
import auth from '../Auth';
import history from '../utils/history';

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
      participatedCapstones: [],
    };
  }


  async componentDidMount() {
    const userID = auth.getUser()._id;

    // get capstones that are moderated by user
    await strapi.axios.get(`${strapiURL}/capstones`,{
      params: {
        moderator: userID
      }
    }).then(response =>{
      this.setState({capstones: response.data});
    });

    // get user info to pull user info
    const tempUser = await strapi.getEntry('users', userID);

    // pull each capstone created from list of created capstones
    const participatedCapstonesPromises = tempUser.createdcapstones.map(c => strapi.axios.get(`${strapiURL}/capstones/${c._id}`));
    const participatedCapstones = (await Promise.all(participatedCapstonesPromises)).map(c => c.data);
    this.setState({participatedCapstones, loading: false});
  }

    handleDelete = async (e, resultID) => {
      await strapi.deleteEntry('capstones', resultID);
      history.push('/');
    };

    handleTileClick = (capstoneName) => {
      history.push(`/ViewCapstone/${capstoneName}`);
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
                    <GridListTile key={strapiURL + result.DisplayPhoto.url} onClick={() => this.handleTileClick(result.id)}>
                      <img src={strapiURL + result.DisplayPhoto.url} alt='Capstone' style={{height: '100%', width: '100%'}}/>

                      <GridListTileBar
                        title={result.CapstoneName}
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
                    <GridListTile key={strapiURL + result2.DisplayPhoto.url} onClick={() => this.handleTileClick(result2._id)}>
                      <img src={strapiURL + result2.DisplayPhoto.url} alt='Capstone' style={{height: '100%', width: '100%'}}/>
                      <GridListTileBar
                        title={result2.CapstoneName}
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

export default compose(
  withStyles(styles),
  withWidth(),
)(ViewYourCapstones);
