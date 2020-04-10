import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const snackRef = React.createRef();

const Snackbar = ({children}) => {
  const onClickDismiss = key => () => {
    snackRef.current.closeSnackbar(key);
  };

  const classes = useStyles();
  return (
    <SnackbarProvider
      ref={snackRef}
      maxSnack={4}
      autoHideDuration={4000}
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      action={(key) => (
        <IconButton
          aria-label='close'
          color='inherit'
          className={classes.close}
          onClick={onClickDismiss(key)}
        >
          <CloseIcon/>
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

Snackbar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Snackbar;

export const snack = {
  default: {variant: 'default'},
  info: {variant: 'info'},
  success: {variant: 'success'},
  error: {variant: 'error'},
  warning: {variant: 'warning'},
};
