import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    padding: 0,
    color: theme.palette.primary.main,
    borderRadius: 0
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
  }
}));

const SubMenu = ({subRoutes, title}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <StyledTooltip
      disableFocusListener
      interactive
      placement='bottom'
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
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
      <div className={open ? classes.title : ''}>{title}</div>
    </StyledTooltip>
  );
};

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
