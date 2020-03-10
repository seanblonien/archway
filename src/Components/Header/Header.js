/*
Filename: Header.js
Initial Contributors: Ryan Cave
Further Contributors: Caleb DeHaan, Sean Blonien
 */

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {university} from "../../constants";
import Drawer from './Drawer.js';
import SearchBar from './SearchBar.js';
import SubMenu from './SubMenu.js';
import {auth} from "../../index";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';

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
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
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
    },

});

class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleLogout = () =>{
        this.props.auth.logout();
        this.handleMenuClose();
    };

    handleToAccount = () =>{
        this.props.history.push('/ViewProfile/' + auth.getNickname());
    };

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}

                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >

                {this.props.auth.isAuthenticated() && <MenuItem onClick={this.handleToAccount}>Account</MenuItem>}
                {!this.props.auth.isAuthenticated() && <MenuItem onClick={this.props.auth.login}>Login / Register</MenuItem>}
                {this.props.auth.isAuthenticated() && <MenuItem onClick={this.handleLogout}>Logout</MenuItem>}

            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/*hamburger only shows in mobile view :)*/}
                        <div className={classes.sectionMobile}>
                            < Drawer {...this.props} />
                        </div>
                        <Button style={{color: 'white', fontSize: '25px'}} component={Link} to="/">
                            <img src={require('../../Images/univ_logo.svg')} alt={university} title={university} height="40" width="40" style={{paddingRight: 7}}/>
                            {university} | Archway
                        </Button>
                        <div className={classes.sectionDesktop}>
                            <Button style={{color: 'white', fontSize: '15px'}} component={Link} to="/About">
                                <SubMenu title="About"
                                         items={["FAQ", String(university), "Archway"]}
                                         links={["/FAQ", "/About", "/About"]}>
                                </SubMenu>
                            </Button>
                            <Button style={{color: 'white', fontSize: '15px'}} component={Link} to="/Sponsors">
                                <SubMenu title="Sponsors"
                                         items={["Become a Sponsor", "View Current Sponsors"]}
                                         links={["/Sponsors", "/ViewSponsors"]}>
                                </SubMenu>
                            </Button>
                            <Button style={{color: 'white', fontSize: '15px'}} component={Link} to="/Capstones">
                                <SubMenu title="Projects"
                                         items={["All Capstones","All Departments"]}
                                         links={["/Capstones", "/ViewAllDepartments"]}>
                                </SubMenu>
                            </Button>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                            </div>
                            <div key={new Date().getTime()} >
                                <SearchBar />
                            </div>
                        </div>

                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>


                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  withRouter
)(PrimarySearchAppBar);
