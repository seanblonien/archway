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
import api from '../../Services/api';
import universityLogo from '../../Static/univ_logo.svg';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import LoadingCircle from '../LoadingCircle';
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
      links: null
    };
  }

  async componentDidMount() {
    const {links} = await api.navbar.find();
    console.log(links);
    this.setState({loading: false});
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
    const {loading, anchorEl, links} = this.state;
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
      loading
        ? <LoadingCircle/>
        : <div className={classes.root}>
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
                {links && links.routes && links.routes.map(route => (
                  <Button
                    key={route.id}
                    style={{color: 'white', fontSize: '15px'}}
                    component={Link}
                    to={routes.path}
                  >
                    <SubMenu
                      title={route.label}
                      subRoutes={route.subRoutes}
                    />
                  </Button>
                ))}
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
                    links={[routes.sponsors.path, routes.viewsponsors.genPath()]}
                  />
                </Button>
                <Button style={{color: 'white', fontSize: '15px'}} component={Link} to={routes.capstones.genPath()}>
                  <SubMenu
                    title='Projects'
                    items={['All Capstones','All Departments']}
                    links={[routes.capstones.genPath(), routes.viewdepartments.path]}
                  />
                </Button>
              </div>
              <div className={classes.grow}/>
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
