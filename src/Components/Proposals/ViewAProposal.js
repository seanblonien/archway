import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Divider from '@material-ui/core/Divider';

class ViewAProposal extends Component {
  constructor(props) {
    super(props);
    this.state ={
      open: false,
    };
  }

  checkValue = (value) => {
    if (value) {
      return <DialogContentText>{value}</DialogContentText>;
    }
    return <DialogContentText>Not Given</DialogContentText>;
  };

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
            <Grid container alignItems='center' spacing={3}>
              <Grid item xs={6}>
                <Typography>
                  Name: {proposal.creator.Fullname}
                </Typography>
                <br/>
                <Typography>
                  Contact: {proposal.email}  {proposal.phone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Sponsoring Company:
                </Typography>
                {proposal.sponsors[0] && this.checkValue(proposal.sponsors[0].name)}
                {!proposal.sponsors[0] && this.checkValue(null)}
                <Typography>Department(s): </Typography>
                {proposal.departments.map((value) => (
                  <DialogContentText key={value}>
                    {value.name}
                  </DialogContentText>))
                }
              </Grid>
              <Grid item xs={12}>
                <Divider/>
                <br/>
                {proposal.isIntellectualPropertyRequired &&
                  <Typography>
                    Intellectual Property Agreement Required
                  </Typography>
                }
                {proposal.isNondisclosureRequired &&
                  <Typography>
                    Non-Disclosure Agreement Required
                  </Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <Typography>Description:</Typography>
                {this.checkValue(proposal.projectDescription)}
              </Grid>
              <Divider/>
              <br/>
              <Grid item xs={12}>
                <Typography>Deliverables:</Typography>
                {this.checkValue(proposal.projectDeliverables)}
              </Grid>
              <Grid item xs={6}>
                <Typography>Financial Contribution:</Typography>
                {this.checkValue(proposal.financialSupport)}
              </Grid>
              <Grid item xs={6}>
                <Typography>Intended Project Use: </Typography>
                {this.checkValue(proposal.projectUse)}
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );

  }
}

ViewAProposal.propTypes = {
  proposal: PropTypes.shape({
    status: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isNondisclosureRequired: PropTypes.bool,
    isIntellectualPropertyRequired: PropTypes.bool,
    creator: PropTypes.isRequired,
    email: PropTypes.isRequired,
    phone: PropTypes.isRequired,
    departments: PropTypes.isRequired,
    projectDescription: PropTypes.string,
    projectDeliverables: PropTypes.string,
    projectUse: PropTypes.string,
    financialSupport: PropTypes.string,
    sponsors: PropTypes.isRequired,
  }).isRequired
};

export default (ViewAProposal);
