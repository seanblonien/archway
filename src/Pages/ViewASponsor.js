import {Link} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import LoadingCircle from '../Components/LoadingCircle';
import PageTitleTypography from '../Components/PageTitleTypography';
import SubHeadingTextTypography from '../Components/SubHeadingTextTypography';
import SponsorForm from '../Components/SponsorForm';
import api from '../Services/api';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import {imageURL} from '../utils/utils';
import {permissions} from "../constants";
import Can from '../Components/Can';
import AuthContext from "../Contexts/AuthContext";

const styles = theme => ({
  card: {
    raised: true,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  sponsorImage: {
    height: 'auto',
    maxWidth: '80%',
    borderRadius: '5px',
  },
  title: {
    fontSize: 14,
  },
  button: {
    border: '2px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px`,
  },
  pos: {
    marginBottom: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  capstoneCard: {
    background: '#f1f1f1f1',
  },
  associatedCard: {
    raised: true,
    height: '200px',
    overflow: 'auto',
  },
  media: {
    maxWidth: 400,
    borderRadius: '25px',
  },
  primaryButton: {
    color: 'primary',
  },
  center: {
    display: 'block',
    width: '50%',
  }
});

class ViewASponsor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sponsor: [],
      canEdit: false
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const sponsor = await api.sponsors.findOne(match.params.id);
    const {user} = this.context;
    this.setState({loading: false, sponsor});

    for (const person of sponsor.personnel) {
      if (person.id === user.id) {
        this.setState({canEdit: true});
      }
    }
  }

  render() {
    const {classes} = this.props;
    const {loading, sponsor, canEdit} = this.state;

    if (!loading) {
      return (
        <div className='ViewASponsor'>
          <Grid container justify='center'>
            <Grid xs={10}>
              <Grid container>
                <Grid xs={12}>
                  <Card>
                    <PageTitleTypography text={sponsor.name}/>
                    {canEdit &&
                    <Can perform={permissions.application.sponsors.update}>
                      <SponsorForm title='Edit Sponsor' sponsor={sponsor}
                                   type='edit'/>
                    </Can>
                    }
                    <Can perform={permissions.application.sponsors.create}>
                      <SponsorForm title='Create New Sponsor' type='create'/>
                    </Can>
                    <Divider style={{marginTop: '2%'}}/>
                  </Card>
                </Grid>
                <Card>
                  <Grid container justify='center'>
                    <Grid xs={6}>

                      <Typography color='primary' align='center' component='span'>
                        <h1> Logo </h1>
                      </Typography>
                      <Divider style={{marginBottom: '2%'}}/>
                      <Typography align='center' style={{marginBottom: '1%'}}>
                        <img src={imageURL.sponsor(sponsor.logo)} className={classes.sponsorImage} alt='Display'/>
                      </Typography>
                      <CardContent>
                        <MediaMarkdown>
                          {sponsor.description}
                        </MediaMarkdown>
                      </CardContent>

                      <Grid container justify='center'>
                        <Link href={sponsor.url}>
                          <Button
                            className={classes.button}
                            style={{marginTop: '2%'}}
                          >
                            <Typography color='primary' variant='h6' component='span'>
                              Visit {sponsor.name} Website
                            </Typography>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>

                <Grid xs={12}>
                  <Card>
                    <Divider style={{marginTop: '2%'}}/>
                    <Typography align='center'>
                      <h1> {`${sponsor.name}'s`} Sponsored Capstones </h1>
                    </Typography>
                    <CardContent>
                      <Typography>
                        {`Currently involved in ${sponsor.capstones.length} capstones`}
                      </Typography>
                      <Grid container spacing={8}>
                        {sponsor.capstones.map((result) => (
                          <Grid item xs={12} md={6} style={{marginTop: '2%'}}>
                            <Card className={classes.capstoneCard} style={{height: '200px', overflow: 'auto'}}>
                              <CardContent>
                                <SubHeadingTextTypography text={result.title}/>
                                <Divider/>
                                <MediaMarkdown>
                                  {result.description}
                                </MediaMarkdown>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

ViewASponsor.contextType = AuthContext;

export default (withStyles(styles)(withWidth()(ViewASponsor)));
