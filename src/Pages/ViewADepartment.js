import {withStyles, withTheme} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import LoadingCircle from '../Components/LoadingCircle';
import CapstonesTab from '../Components/Capstone/CapstonesTab';
import Professors from '../Components/Department/Professors';
import Cover from '../Components/Cover';
import api from '../Services/api';
import DepartmentForm from '../Components/Department/DepartmentForm';
import Can from '../Components/Can';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import {permissions} from '../constants';
import gStyle from '../utils/styles.module.css';

const styles = (theme) => ({
  cover: {
    height: '500px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
  },
  link: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    '&:visited': {
      color: theme.palette.secondary.main,
    }
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
  },
  capstones: {
    padding: '3%',
  }
});

class ViewADepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: {},
    };
  }

  async componentDidMount() {
    const {match} = this.props;
    const department = await api.departments.findOne(match.params.id);
    this.setState({loading: false, department});
  }

  updateData = async () => {
    const {match} = this.props;
    const department = await api.departments.findOne(match.params.id);
    this.setState({loading: false, department});
  };

  render() {
    const {classes} = this.props;
    const {loading, department} = this.state;

    return loading ?
      <LoadingCircle/> :
      <div>
        <Cover covers={department.cover}>
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
              <Grid item container md={6} direction='row' justify='space-evenly'>
                {department.phone && <Grid item className={classes.contact}>
                  <PhoneRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={`tel:${department.phone}`}>{department.phone}</Link>
                </Grid>}
                {department.email && <Grid item className={classes.contact}>
                  <MailOutlineRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={`mailto:${department.email}`}>{department.email}</Link>
                </Grid>}
                {department.url && <Grid item className={classes.contact}>
                  <ComputerRoundedIcon color='secondary' style={{marginRight: '5px'}}/>
                  <Link className={classes.link} href={department.url}>View Department Page</Link>
                </Grid>}
                <Can perform={permissions.application.departments.update}>
                  <div className={gStyle.gridListContainer}>
                    <DepartmentForm
                      title='Edit Department'
                      department={department}
                      type='edit'
                      update={this.updateData}
                    />
                  </div>
                </Can>
              </Grid>
            </Grid>
          </Grid>
        </Cover>
        <Grid className={classes.capstones} container direction='column'>
          {department.capstones[0] &&
            <div>
              <MediaMarkdown>{`####${department.name} Capstones`}</MediaMarkdown>
              <br/>
              <CapstonesTab capstones={department.capstones}/>
              <br/><br/>
            </div>
          }
          <Professors department={department}/>
        </Grid>
      </div>
    ;
  }
}
export default compose(
  withStyles(styles),
  withWidth(),
  withTheme
)(ViewADepartment);
