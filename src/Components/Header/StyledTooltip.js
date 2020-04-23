import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {childrenPropTypes} from '../../utils/PropTypesConfig';

const BaseStyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    padding: 0,
    color: theme.palette.primary.main,
    marginTop: 0,
    marginBottom: 0
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
  }
}));

export const StyledTooltip = ({title, children, ...rest}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <BaseStyledTooltip
      disableFocusListener
      interactive
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={title}
      {...rest}
    >
      <div className={`${open ? classes.title : ''}`}>
        {children}
      </div>
    </BaseStyledTooltip>
  );
};

StyledTooltip.propTypes = {
  title: PropTypes.node.isRequired,
  ...childrenPropTypes
};
