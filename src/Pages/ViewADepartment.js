import {Box, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {withStyles, withTheme} from '@material-ui/core/styles';
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import Can from '../Components/Can';
import CapstonesTab from '../Components/Capstone/CapstonesTab';
import UserGrid from '../Components/Capstone/UserGrid';
import Cover from '../Components/Cover';
import DepartmentForm from '../Components/Department/DepartmentForm';
import PageWithMargin from '../Components/LayoutWrappers/PageWithMargin';
import LoadingCircle from '../Components/LoadingCircle';
import SectionTitle from '../Components/Typography/SectionTitle';
import {permissions} from '../constants';
import api from '../Services/api';

const styles = (theme) => ({
  cover: {
    height: '500px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    overflow: 'visible'
  },
  link: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    '&:visited': {
      color: theme.palette.secondary.main,
    }
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
      <>
        <Box position='relative' zIndex={1}>
          <Cover covers={department.cover}/>
          <Box className={classes.cover} px={1} position='absolute' zIndex={3} top={0} component={Grid} container justify='center'>
            <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
              <Typography variant='h3' align='center'>{department.name}</Typography>
              <Typography>{department.description}</Typography>
            </Grid>
            <Grid item xs={12} container justify='space-evenly'>
              {department.phone &&
                <Grid item xs container justify='center'>
                  <Box mx={2}><PhoneRoundedIcon color='secondary'/></Box>
                  <Link className={classes.link} href={`tel:${department.phone}`}>{department.phone}</Link>
                </Grid>
              }
              {department.email &&
                <Grid item xs container justify='center'>
                  <Box mx={2}><MailOutlineRoundedIcon color='secondary'/></Box>
                  <Link className={classes.link} href={`mailto:${department.email}`}>{department.email}</Link>
                </Grid>
              }
              {department.url &&
                <Grid item xs container justify='center'>
                  <Box mx={2}><ComputerRoundedIcon color='secondary'/></Box>
                  <Link className={classes.link} href={department.url}>View Department Page</Link>
                </Grid>
              }
            </Grid>
            <Grid item xs={12} container justify='center'>
              <Can perform={permissions.application.departments.update}>
                <DepartmentForm
                  title='Edit Department'
                  department={department}
                  type='edit'
                  update={this.updateData}
                />
              </Can>
            </Grid>
          </Box>
        </Box>
        <PageWithMargin>
          {department.capstones[0] &&
            <>
              <Grid item xs={12}>
                <SectionTitle>{department.name} Capstones</SectionTitle>
              </Grid>
              <Grid item xs={12}>
                <CapstonesTab capstones={department.capstones}/>
              </Grid>
            </>
          }
          {department.professors[0] ?
            <Grid item xs={12}>
              <SectionTitle>Professors</SectionTitle>
              <UserGrid userList={department.professors}/>
            </Grid>
            : null
          }
        </PageWithMargin>
      </>
    ;
  }
}
export default compose(
  withStyles(styles),
  withTheme
)(ViewADepartment);
