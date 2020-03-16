import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

class MyModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  render() {
    const {classes} = this.props;
    const {open} = this.state;

    return (
      <Modal aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' open={open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant='h4' id='modal-title'>
            Register as a New User
          </Typography>
          <Typography variant='subtitle1' id='simple-modal-description'>
            <Divider/>
            <form className={classes.container} noValidate autoComplete='off'>
              <TextField id='standard-name' label='Name' className={classes.textField} onChange={this.handleChange('name')} margin='normal'/>
            </form>
            <form className={classes.container} noValidate autoComplete='off'>
              <TextField id='standard-name' label='Username' className={classes.textField} onChange={this.handleChange('name')} margin='normal'/>
            </form>
            <form className={classes.container} noValidate autoComplete='off'>
              <TextField id='standard-name' label='Email' className={classes.textField} onChange={this.handleChange('name')} margin='normal'/>
            </form>
            <br/>
          </Typography>

          <Grid container>
            <Grid xs={6}>
              <Button variant='outlined' color='primary' className={classes.button}>
                Submit
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant='outlined' color='secondary' className={classes.button}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

    );
  }
}

MyModal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

const SimpleModal = withStyles(styles)(MyModal);

export default SimpleModal;
