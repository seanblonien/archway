import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const MenuLink = ({children, to, ...rest}) => {
  const lisItem = (
    <ListItem button {...rest}>
      <ListItemText>
        {children}
      </ListItemText>
    </ListItem>
  );

  return (
    to
      ? <Link component={RouterLink} to={to}>{lisItem}</Link>
      : lisItem
  );
};

MenuLink.propTypes = {
  ...childrenPropTypes,
  to: PropTypes.string,
};

MenuLink.defaultProps = {
  to: null
};

export default MenuLink;
