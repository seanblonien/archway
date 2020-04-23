import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {StyledTooltip} from './StyledTooltip';

const SubMenu = ({subRoutes, title}) => (
  <StyledTooltip
    title={
      subRoutes
        ? subRoutes.map(route => (
          <ListItem key={route.id} button component={RouterLink} to={route.path}>
            <ListItemText>
              {route.label}
            </ListItemText>
          </ListItem>
        ))
        : ''
    }
  >
    {title}
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
