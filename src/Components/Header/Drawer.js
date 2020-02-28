/*
Filename: Drawer.js
Contributors: Ryan Cave
 */


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import AboutIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import Publish from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import BusinessIcon from '@material-ui/icons/BusinessTwoTone';
import ViewAllSponsorsIcon from '@material-ui/icons/ContactsTwoTone';
import ViewAllDepartmentsIcon from '@material-ui/icons/SchoolTwoTone';
import FAQIcon from '@material-ui/icons/HelpTwoTone';
import ViewYourCapstonesIcon from '@material-ui/icons/TableChartTwoTone';


const styles = {
    list: {
        width: 250,
    }
};

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class HeaderDrawer extends React.Component {
    state = {
        left: false
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>

                    <ListItemLink href="/">
                        < HomeIcon />
                        <ListItemText primary="Home" />
                    </ListItemLink>

                    <ListItemLink href="/Capstones">
                        < DashboardIcon />
                        <ListItemText primary="Capstone List" />
                    </ListItemLink>

                    <ListItemLink href="/about">
                        < AboutIcon />
                        <ListItemText primary="About" />
                    </ListItemLink>

                    {this.props.auth.isAuthenticated() && <ListItemLink href="/CreateCapstone">
                        < CreateIcon />
                        <ListItemText primary="Create Capstone" />
                    </ListItemLink>}

                    {this.props.auth.isAuthenticated() && <ListItemLink href="/ImportUsers">
                        < Publish />
                        <ListItemText primary="Import New Users" />
                    </ListItemLink>}

                    {this.props.auth.isAuthenticated() && <ListItemLink href="/ViewYourCapstones/">
                        < ViewYourCapstonesIcon />
                        <ListItemText primary="View Your Capstones" />
                    </ListItemLink>}

                    <ListItemLink href="/Sponsors">
                        < BusinessIcon />
                        <ListItemText primary="Become a Sponsor" />
                    </ListItemLink>

                    <ListItemLink href="/ViewSponsors">
                        <ViewAllSponsorsIcon/>
                        <ListItemText primary="View All Sponsors"/>
                    </ListItemLink>

                    <ListItemLink href="/ViewAllDepartments">
                        <ViewAllDepartmentsIcon/>
                        <ListItemText primary="View Departments"/>
                    </ListItemLink>

                    <ListItemLink href="/FAQ">
                        <FAQIcon/>
                        <ListItemText primary="Frequently Asked Questions"/>
                    </ListItemLink>

                    < Divider />
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
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
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

Drawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderDrawer);
