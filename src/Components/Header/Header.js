import {Box} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import React, {Component} from 'react';
import {withRouter, Link as RouterLink} from 'react-router-dom';
import compose from 'recompose/compose';
import AuthContext from '../../Contexts/AuthContext';
import api from '../../Services/api';
import universityLogo from '../../Static/univ_logo.svg';
import history from '../../utils/Routing/history';
import Drawer from './Drawer';
import SearchBar from './SearchBar';
import SubMenu from './SubMenu';

const styles = theme => ({
  tab: {
    color: 'white',
    fontSize: '15px',
    maxWidth: 'none',
    minWidth: '100px',
    opacity: 1
  },
  title: {
    fontSize: '25px',
  },
  popover: {
    position: 'relative',
    pointerEvents: 'none',
    padding: theme.spacing(1)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left'
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
      loading: true,
      routes: null,
      tab: 'root',
    };
  }

  async componentDidMount() {
    const {links: {routes}} = await api.navbar.find();
    this.setState({loading: false, routes});
  }

  setTab = (event, tab) => {
    this.setState({tab});
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
    const {loading, anchorEl, routes, tab} = this.state;
    const {classes, theme} = this.props;
    const {setTab, handleMenuClose, handleLogout, handleProfileMenuOpen} = this;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {isAuthenticated && <MenuItem onClick={() => history.push(routes.dashboard.path)}>Dashboard</MenuItem>}
        {!isAuthenticated && <MenuItem onClick={() => history.push(routes.auth.login.path)}>Login / Register</MenuItem>}
        {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
      </Menu>
    );

    return (
      loading
        ? null
        : <div>
          <AppBar position='static'>
            <Toolbar variant='dense'>
              {/* hamburger only shows in mobile view :) */}
              {/* <div className={classes.sectionMobile}> */}
              {/*  <Drawer/> */}
              {/* </div> */}
              <div className={classes.sectionDesktop}>

                <Tabs value={tab} onChange={setTab}>
                  {routes && routes.map(route => (
                    <Tab
                      key={`tab-${route.id}`}
                      value={route.id}
                      className={classes.tab}
                      label={
                        <SubMenu
                          subRoutes={route.subRoutes}
                          title={
                            route.id === 'root'
                              ? <Box component={Grid} container alignItems='center' justify='center'>
                                <Box mx={2}>
                                  <img src={universityLogo} alt={theme.university} title={theme.university} height='40' width='40'/>
                                </Box>
                                <span className={classes.title}>{`${theme.university} | Archway`}</span>
                              </Box>
                              : route.label
                          }
                        />
                      }
                      component={RouterLink}
                      to={route.path}
                    />
                  ))}
                </Tabs>
              </div>

              <div className={classes.sectionDesktop}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon/>
                  </div>
                </div>
                <div key={new Date().getTime()}>
                  <SearchBar/>
                </div>
              </div>

              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle/>
                </IconButton>
              </div>


              <div className={classes.sectionMobile}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
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
