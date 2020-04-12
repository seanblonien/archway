import {withStyles, withTheme} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import {Parallax} from 'react-parallax';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import LoadingCircle from '../Components/LoadingCircle';
import api from '../Services/api';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import {strapiURL} from '../constants';

const styles = (theme) => ({
  cover: {
    height: '500px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
  },
  link: {
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      color: theme.palette.primary.light,
    }
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
  }
});

class ViewADepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: [],
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const department = await api.departments.findOne(match.params.id);
    this.setState({loading: false, department});
  }

  render() {
    const {classes} = this.props;
    const {loading, department} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <Parallax bgImage={strapiURL + department.cover.url} strength={500}>
          <Grid className={classes.cover} container direction='row' justify='center' alignItems='center'>
            <Grid item container direction='column' alignItems='center'>
              <Grid item>
                <MediaMarkdown item>{`###${department.name}`}</MediaMarkdown>
              </Grid>
              <br/>
              <Grid item md={5}>
                <MediaMarkdown item>{department.description}</MediaMarkdown>
              </Grid>
              <br/>
              <Grid item container md={6} direction='row' justify='space-between'>
                <Grid item className={classes.contact}>
                  <PhoneRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={`tel:${department.phone}`}>{department.phone}</Link>
                </Grid>
                <Grid item className={classes.contact}>
                  <MailOutlineRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={`mailto:${department.email}`}>{department.email}</Link>
                </Grid>
                <Grid item className={classes.contact}>
                  <ComputerRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={department.url}>View Department Page</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Parallax>
      </div>
    ;
  }
}
export default compose(
  withStyles(styles),
  withWidth(),
  withTheme
)(ViewADepartment);
