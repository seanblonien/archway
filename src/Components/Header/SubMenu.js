import PropTypes from 'prop-types';
import React from 'react';
import MenuLink from './MenuLink';
import {StyledTooltip} from './StyledTooltip';

const SubMenu = ({subRoutes, title}) => (
  <StyledTooltip
    title={
      subRoutes
        ? subRoutes.map(route => (
          <MenuLink key={route.id} to={route.path}>{route.label}</MenuLink>
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
