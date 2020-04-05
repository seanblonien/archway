import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit *2,
    background: '#00b8ee',
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },

});

class Message extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    const {callback} = this.props;
    this.setState({open: false});
    callback(false);
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  render() {
    const {classes, title, message} = this.props;
    const {open} = this.state;

    return (
      <Modal aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' open={open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant='h5' id='modal-title'>{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='p' id='modal-message'>{message}</Typography>
            </Grid>
            <Grid container item justify='center'>
              <Grid item>
                <Button variant='contained' onClick={this.handleClose}>OK</Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>

    );
  }
}

Message.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default withStyles(styles)(Message);
