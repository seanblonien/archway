import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
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

const SubMenu = ({items, links, title}) => (
  <>
    <StyledTooltip
      disableFocusListener
      interactive
      placement='bottom-start'
      title={
        <>
          {items.map((value, index) => {
            const linkValue = links[index];
            return (
              <Link key={linkValue} component={RouterLink} to={linkValue}>
                <StyledMenuItem>
                  {value}
                </StyledMenuItem>
              </Link>
            );
          })}
        </>}
    >
      <MenuItem
        aria-controls='customized-menu'
        aria-haspopup='true'
        variant='contained'
        color='primary'
        style={{color: 'white'}}
      >
        {title}
      </MenuItem>
    </StyledTooltip>

  </>
);

SubMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
};

export default SubMenu;
