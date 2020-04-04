import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';

const styles = {
  form: {
    fullWidth: true,
    maxWidth: 'lg'
  },
  section: {
    margin: 20
  }
};

class ViewAProposal extends Component {
  constructor(props) {
    super(props);
    this.state ={
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {proposal} = this.props;
    const {open} = this.state;

    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          View
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth
          maxWidth='md'
        >
          <DialogTitle id='form-dialog-title'>{proposal.projectTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Contact: {proposal.email}  {proposal.phone}
            </DialogContentText>
            <DialogContentText>
              Name:
            </DialogContentText>
            <DialogContentText>
              Sponsoring Company:
            </DialogContentText>
            <DialogContentText>Department(s):</DialogContentText>
            <DialogContentText>Description: {proposal.projectDescription}</DialogContentText>
            <DialogContentText>Deliverables: {proposal.projectDeliverables}</DialogContentText>
            {proposal.intellectualProperty &&
              <DialogContentText>
                Intellectual Property Agreement Required
              </DialogContentText>
            }
            {proposal.nondisclosure &&
              <DialogContentText>
                Intellectual Property Agreement Required
              </DialogContentText>
            }
            <DialogContentText>Financial Contribution: {proposal.financialSupport}</DialogContentText>
            <DialogContentText>Intended Project Use: {proposal.projectUse}</DialogContentText>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    );

  }
}

ViewAProposal.propTypes = {
  proposal: PropTypes.isRequired
};

export default compose(
  withStyles(styles)
)(ViewAProposal);
