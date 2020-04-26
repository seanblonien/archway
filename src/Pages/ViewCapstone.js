import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import {withStyles} from '@material-ui/core/styles';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import Can from '../Components/Can';
import CapstonePhotos from '../Components/Capstone/CapstonePhotos';
import UserGrid from '../Components/Capstone/UserGrid';
import Cover from '../Components/Cover';
import PageWithMargin from '../Components/LayoutWrappers/PageWithMargin';
import LoadingCircle from '../Components/LoadingCircle';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import SectionTitle from '../Components/Typography/SectionTitle';
import {permissions} from '../constants';
import AuthContext from '../Contexts/AuthContext';
import api from '../Services/api';
import history from '../utils/Routing/history';
import routes from '../utils/Routing/routes';
import {convertStrapiDate, imageURL} from '../utils/utils';

const styles = () => ({
  pointer:{
    cursor: 'pointer'
  }
});

class ViewCapstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstone: {},
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const capstone = await api.capstones.findOne(match.params.capstoneID);
    this.setState({loading: false, capstone});
  };

  getSponsors = () => {
    const {capstone} = this.state;
    return capstone.sponsors.map((sponsor) => sponsor.name);
  }

  handleSponsorClick = (sponsorName) => {
    history.push(routes.viewsponsor.genPath(sponsorName));
  };

  handleEdit = () => {
    const {capstone} = this.state;
    history.push(routes.dashboard.createcapstone.genPath(capstone.id));
  }

  render() {
    const {classes} = this.props;
    const {loading, capstone} = this.state;
    const {user, isAuthenticated} = this.context;
    const {handleEdit} = this;
    const isThisProfessors = isAuthenticated && capstone.professors && capstone.professors.filter(prof => prof.id === user.id)[0];
    const canEdit = isAuthenticated && isThisProfessors;

    return loading ?
      <LoadingCircle/> :
      <>
        <Cover covers={capstone.cover}/>
        <PageWithMargin>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Typography variant='h3'>{capstone.name}</Typography>
            <Typography variant='h6'>
              <strong>Start Date:</strong> {convertStrapiDate(capstone.startDate).toDateString()}
            </Typography>
            <Typography variant='h6'>
              <strong>End Date:</strong> {convertStrapiDate(capstone.endDate).toDateString()}
            </Typography>
            <Typography variant='h6'>
              <strong>Sponsor(s):</strong> {this.getSponsors().join(', ') || 'None'}
            </Typography>
            <Grid item>
              <GridList cellHeight={120} cols={2}>
                {capstone.sponsors && capstone.sponsors.map(sponsor => (
                  <GridListTile
                    style={{maxWidth: '320px'}}
                    key={`sponsor-${sponsor.id}`}
                    onClick={() => this.handleSponsorClick(sponsor.id)}
                    className={classes.pointer}
                  >
                    <img
                      src={imageURL.sponsor(sponsor.logo)}
                      alt='Sponsor' style={{height: '100%', width: '100%'}}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
            <br/>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={6} component={Box} my={2}>
            <MediaMarkdown>{capstone.description}</MediaMarkdown>
          </Grid>
          {capstone.students[0] &&
            <Grid item xs={12} component={Box} py={2}>
              <SectionTitle>Students</SectionTitle>
              <UserGrid userList={capstone.students}/>
            </Grid>
          }
          {capstone.professors[0] &&
            <Grid item xs={12} component={Box} py={2}>
              <SectionTitle>Professors</SectionTitle>
              <UserGrid userList={capstone.professors}/>
            </Grid>
          }
          {capstone.media[0] &&
            <Grid item xs={12} component={Box} py={2}>
              <CapstonePhotos capstone={capstone}/>
            </Grid>
          }
          {canEdit &&
            <Grid item xs={12} sm={12} md={8} lg={8} xl={6} component={Box} my={4}>
              <Can perform={permissions.application.capstones.update}>
                <Button variant='contained' onClick={handleEdit}>
                  Edit Capstone
                </Button>
              </Can>
            </Grid>
          }
        </PageWithMargin>
      </>
    ;
  }
}

ViewCapstone.contextType = AuthContext;

export default compose(withWidth(), withStyles(styles)) (ViewCapstone);

