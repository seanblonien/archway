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

const SubMenu = ({subRoutes, title}) => (
  <StyledTooltip
    disableFocusListener
    interactive
    placement='bottom'
    title={
      subRoutes
        ? subRoutes.map(route => (
          <Link key={route.id} component={RouterLink} to={route.path}>
            <StyledMenuItem>
              {route.label}
            </StyledMenuItem>
          </Link>
        ))
        : ''
    }
  >
    <div>{title}</div>
  </StyledTooltip>
);

SubMenu.propTypes = {
  subRoutes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
  })),
  title: PropTypes.node.isRequired
};

SubMenu.defaultProps = {
  subRoutes: null
};

export default SubMenu;
