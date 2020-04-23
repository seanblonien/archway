import {Box} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles, withTheme} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React, {Component} from 'react';
import {withRouter, Link as RouterLink} from 'react-router-dom';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';
import AuthContext from '../../Contexts/AuthContext';
import api from '../../Services/api';
import universityLogo from '../../Static/univ_logo.svg';
import {StyledTooltip} from './StyledTooltip';
import {widthPropTypes} from '../../utils/PropTypesConfig';
import history from '../../utils/Routing/history';
import {widthMatchUp} from '../../utils/utils';
import SearchBar from './SearchBar';
import SubMenu from './SubMenu';
import appRoutes from '../../utils/Routing/routes';

const styles = () => ({
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
});

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
    logout();
  };

  render() {
    const {isAuthenticated} = this.context;
    const {loading, routes, tab} = this.state;
    const {classes, theme, width} = this.props;
    const {setTab, handleLogout} = this;

    const profileMenu = (
      <StyledTooltip
        title={
          <div>
            {isAuthenticated && <MenuItem onClick={() => history.push(appRoutes.dashboard.path)}>Dashboard</MenuItem>}
            {!isAuthenticated && <MenuItem onClick={() => history.push(appRoutes.auth.login.path)}>Login / Register</MenuItem>}
            {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          </div>
        }
      >
        <AccountCircle/>
      </StyledTooltip>
    );

    const rootLabel = (useArchway) => (
      <Box component={Grid} container alignItems='center' justify='center'>
        <Box mx={2}>
          <img src={universityLogo} alt={theme.university} title={theme.university} height='40' width='40'/>
        </Box>
        <span className={classes.title}>{theme.university}{useArchway && ' | Archway'}</span>
      </Box>
    );

    return (
      loading
        ? null
        : <div>
          <AppBar position='static'>
            <Toolbar variant='dense'>
              <Box display='flex' component={Grid} container justify='center'>
                <Grid item xs={12} md={8}>
                  <Tabs
                    value={tab}
                    onChange={setTab}
                    component={Grid} container orientation={widthMatchUp(width, 'md') ? 'horizontal' : 'vertical'}
                  >
                    {routes && routes.map(route => (
                      <Tab
                        key={`tab-${route.id}`} value={route.id}
                        className={classes.tab}
                        component={RouterLink}
                        to={route.path}
                        label={
                          <SubMenu
                            subRoutes={route.subRoutes}
                            title={route.isRoot ? rootLabel(route.useArchway) : route.label}
                          />
                        }
                      />
                    ))}
                  </Tabs>
                </Grid>

                <Grid item xs={12} md={4} container direction='row' alignItems='center' wrap='nowrap'>
                  <Grid item xs container justify='flex-end'>
                    <SearchBar/>
                  </Grid>
                  <Grid item xs={2} container justify='flex-end'>
                    {profileMenu}
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

Header.contextType = AuthContext;
Header.propTypes = widthPropTypes;

export default compose(
  withWidth(),
  withStyles(styles),
  withRouter,
  withTheme
)(Header);
