import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import {Link as RouterLink} from 'react-router-dom';

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
  },
}))(Tooltip);

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
    render() {
        return (
            <div>
              <StyledTooltip disableFocusListener
              interactive
              placement="bottom-start"
              title={
                <React.Fragment>
                  {this.props.items.map((value, index) => {
                            const linkValue = this.props.links[index];
                            return (
                                <Link key={index} component={RouterLink} to={linkValue}>
                                    <StyledMenuItem onClick={this.handleClose}>
                                        {value}
                                    </StyledMenuItem>
                                </Link>
                            )
                        })}
                </React.Fragment>}
                >
                  <MenuItem
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    style={{color: 'white'}}
                >
                    {this.props.title}
                </MenuItem>
              </StyledTooltip>

            </div>
        );
    }
}

export default SubMenu;
