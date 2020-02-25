/*
Filename: Header.js
Contributors: Ryan Cave
 */

import React from 'react';
import PropTypes from 'prop-types';
import {university} from "../../constants";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from './SearchBar.js';
import Drawer from './Drawer.js';
import SubMenu from './SubMenu.js';
import { Link } from '@material-ui/core';

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
        window.location = '/ViewUser/' + localStorage.getItem("nickname");
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

                            < Drawer {...this.props} />

                            <Link href="\">
                                <Button style={{color: 'white'}}>
                                    {university} | Archway
                                </Button>
                            </Link>

                            <SubMenu title="About" 
                                items={["FAQ", String(university), "Archway"]}
                                href={["\\faq", "\\about", "\\about"]}></SubMenu>
                            <SubMenu title="Sponsors" 
                                items={["Become a Sponsor", "View Current Sponsors"]}
                                href={["\Sponsors", "/ViewSponsors"]}></SubMenu>
                            <SubMenu title="Projects" 
                                items={["All Capstones","All Departments"]}
                                href={["/Capstones", "/ViewAllDepartments"]}></SubMenu>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                            </div>

                            <div key={new Date().getTime()} >
                            <SearchBar />
                            </div>

                            <div className={classes.grow} />
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


export default withStyles(styles)(PrimarySearchAppBar);
