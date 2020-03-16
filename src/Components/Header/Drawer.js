import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/BusinessTwoTone';
import ViewAllSponsorsIcon from '@material-ui/icons/ContactsTwoTone';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import FAQIcon from '@material-ui/icons/HelpTwoTone';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import Publish from '@material-ui/icons/Publish';
import AboutIcon from '@material-ui/icons/QuestionAnswer';
import ViewAllDepartmentsIcon from '@material-ui/icons/SchoolTwoTone';
import ViewYourCapstonesIcon from '@material-ui/icons/TableChartTwoTone';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import auth from '../../Auth';

const styles = {
  list: {
    width: 250,
  }
};

class HeaderDrawer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      left: false
    };
  }

    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    render() {
      const {classes} = this.props;
      const {left} = this.state;

      const sideList = (
        <div className={classes.list}>
          <List>

            <ListItem button component={Link} to='/'>
              <HomeIcon/>
              <ListItemText primary='Home'/>
            </ListItem>

            <ListItem button component={Link} to='/Capstones'>
              <DashboardIcon/>
              <ListItemText primary='Capstone List'/>
            </ListItem>

            <ListItem button component={Link} to='/about'>
              <AboutIcon/>
              <ListItemText primary='About'/>
            </ListItem>

            {auth.isAuthenticated() &&
              <ListItem button component={Link} to='/CreateCapstone'>
                <CreateIcon/>
                <ListItemText primary='Create Capstone'/>
              </ListItem>
            }

            {auth.isAuthenticated() &&
              <ListItem button component={Link} to='/ImportUsers'>
                <Publish/>
                <ListItemText primary='Import New Users'/>
              </ListItem>
            }

            {auth.isAuthenticated() &&
              <ListItem button component={Link} to='/ViewYourCapstones'>
                <ViewYourCapstonesIcon/>
                <ListItemText primary='View Your Capstones'/>
              </ListItem>
            }

            <ListItem button component={Link} to='/Sponsors'>
              <BusinessIcon/>
              <ListItemText primary='Become a Sponsor'/>
            </ListItem>

            <ListItem button component={Link} to='/ViewSponsors'>
              <ViewAllSponsorsIcon/>
              <ListItemText primary='View All Sponsors'/>
            </ListItem>

            <ListItem button component={Link} to='/ViewAllDepartments'>
              <ViewAllDepartmentsIcon/>
              <ListItemText primary='View Departments'/>
            </ListItem>

            <ListItem button component={Link} to='/FAQ'>
              <FAQIcon/>
              <ListItemText primary='Frequently Asked Questions'/>
            </ListItem>

            <Divider/>
          </List>
        </div>
      );

      return (
        <div>
          <IconButton
            className={classes.button}
            onClick={this.toggleDrawer('left', true)}
            color='inherit'
          >
            <MenuIcon/>
          </IconButton>
          <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role='button'
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </Drawer>
        </div>
      );
    }
}

HeaderDrawer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(HeaderDrawer);
