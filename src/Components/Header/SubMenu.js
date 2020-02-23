import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { Toolbar } from '@material-ui/core';

const timeoutLength = 400;

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
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
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

        this.state = {
            anchorEl: null,
            mouseOverButton: false,
            mouseOverMenu: false,
        }
    }
    
    handleClick = event => {
      this.setState({ open: true, anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ mouseOverButton: false, mouseOverMenu: false });
    };
  
    enterButton = event => {
      this.setState({ mouseOverButton: true, anchorEl: event.currentTarget });
    }
  
    leaveButton = () => {
      // Set a timeout so that the menu doesn't close before the user has time to
      // move their mouse over it
      setTimeout(() => {
        this.setState({ mouseOverButton: false });
      }, timeoutLength);
    }

    enterMenu = () => {
      this.setState({ mouseOverMenu: true });
    }
  
    leaveMenu = () => {
       setTimeout(() => {
        this.setState({ mouseOverMenu: false });
       }, timeoutLength);
    }  

    render() {
        const open = this.state.mouseOverButton || this.state.mouseOverMenu;

        return (
            <div>
                <MenuItem
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={this.handleClick}
                    onMouseEnter={this.enterButton}
                    onMouseLeave={this.leaveButton}
                    style={{color: 'white'}}
                >
                    {this.props.title}
                </MenuItem>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    MenuListProps={{
                      onMouseEnter: this.enterMenu,
                      onMouseLeave: this.leaveMenu,
                    }}
                >
                        {this.props.items.map((value, index) => {
                            const linkValue = this.props.href[index]
                            return (
                                <Link key={index} href={linkValue}>
                                <StyledMenuItem onClick={this.handleClose} key={index}>{value}</StyledMenuItem>
                                </Link>
                            )
                        })}
                </StyledMenu>
            </div>
        );
    }
}

export default SubMenu;