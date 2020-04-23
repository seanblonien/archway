import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import compose from 'recompose/compose';
import AuthContext from '../../Contexts/AuthContext';
import universityLogo from '../../Static/univ_logo.svg';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import Drawer from './Drawer';
import SearchBar from './SearchBar';
import SubMenu from './SubMenu';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorEl: undefined,
    };
  }

  handleLogout = () =>{
    const {logout} = this.context;
    this.handleMenuClose();
    logout();
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  render() {
    const {isAuthenticated} = this.context;
    const {anchorEl} = this.state;
    const {classes, theme} = this.props;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {isAuthenticated && <MenuItem onClick={() => history.push(routes.dashboard.path)}>Dashboard</MenuItem>}
        {!isAuthenticated && <MenuItem onClick={() => history.push(routes.auth.login.path)}>Login / Register</MenuItem>}
        {isAuthenticated && <MenuItem onClick={this.handleLogout}>Logout</MenuItem>}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {/* hamburger only shows in mobile view :) */}
            <div className={classes.sectionMobile}>
              <Drawer/>
            </div>
            <Button style={{color: 'white', fontSize: '25px'}} component={Link} to={routes.home.path}>
              <img src={universityLogo} alt={theme.university} title={theme.university} height='40' width='40' style={{paddingRight: 7}}/>
              {theme.university} | Archway
            </Button>
            <div className={classes.sectionDesktop}>
              <Button style={{color: 'white', fontSize: '15px'}} component={Link} to={routes.about.path}>
                <SubMenu
                  title='About'
                  items={['FAQ', String(theme.university), 'Archway']}
                  links={[routes.faq.path, routes.about.path, routes.about.path]}
                />
              </Button>
              <Button style={{color: 'white', fontSize: '15px'}} component={Link} to={routes.sponsors.path}>
                <SubMenu
                  title='Sponsors'
                  items={['Become a Sponsor', 'View Current Sponsors']}
                  links={[routes.sponsors.path, routes.viewsponsors.path]}
                />
              </Button>
              <Button style={{color: 'white', fontSize: '15px'}} component={Link} to={routes.capstones.path}>
                <SubMenu
                  title='Projects'
                  items={['All Capstones','All Departments']}
                  links={[routes.capstones.path, routes.viewdepartments.path]}
                />
              </Button>
            </div>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <SearchBar/>
            </div>

            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup='true'
                onClick={this.handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle/>
              </IconButton>
            </div>


            <div className={classes.sectionMobile}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup='true'
                onClick={this.handleProfileMenuOpen}
                color='inherit'
              >
                <MoreIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

Header.contextType = AuthContext;

export default compose(
  withStyles(styles),
  withRouter,
  withTheme
)(Header);
