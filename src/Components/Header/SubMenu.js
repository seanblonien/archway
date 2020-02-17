import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Toolbar } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0} 
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.handleHoverOver.bind(this);
        this.onMouseLeave = this.handleClose.bind(this);

        this.state = {
            anchorEl: null,
            dropdownOpen: false
        }
    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    handleHoverOver = event => {
        this.setState({anchorEl: event.currentTarget, dropdownOpen: true});

    };

    handleClose = () => {
        this.setState({anchorEl: null, dropdownOpen: false});
    };

    render() {

        const { anchorEl } = this.state;

        return (
            <div>
                <MenuItem
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={this.handleHoverOver}
                    
                    style={{color: 'white'}}
                >
                    {this.props.title}
                </MenuItem>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <Toolbar>
                        {this.props.items.map((value, index) => {
                            const linkValue = this.props.href[index]
                            return (
                                <Link href={linkValue}>
                                <StyledMenuItem key={index}>{value}</StyledMenuItem>
                                </Link>
                            )
                        })}
                    </Toolbar>
                </StyledMenu>
            </div>
        );
    }
}

SubMenu.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default SubMenu;