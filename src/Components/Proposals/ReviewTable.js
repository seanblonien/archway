import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withSnackbar} from 'notistack';
import api from '../../Services/api';
import ViewAProposal from './ViewAProposal';
import ProposalForm from './ProposalForm';
import gStyle from '../../utils/styles.module.css';
import {snack} from '../../utils/Snackbar';

class ReviewTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  handleDelete = async (e, id) => {
    const {update, enqueueSnackbar} = this.props;
    try {
      await api.proposals.delete(id);
      enqueueSnackbar('Proposal was successfully deleted', snack.success);
    } catch (err) {
      enqueueSnackbar('There was a problem deleting that proposal', snack.error);
    }
    update();
  };

  handleApprove = async (e, id) => {
    const {update, enqueueSnackbar} = this.props;

    try {
      await api.proposals.update(id, {
        status: 'submittedApproved'
      });
      enqueueSnackbar('Proposal successfully approved', snack.success);
    } catch (err) {
      enqueueSnackbar('Proposal status was not changed', snack.error);
    }
    update();
  };

  handleDeny = async (e, id) => {
    const {update, enqueueSnackbar} = this.props;
    try {
      await api.proposals.update(id, {
        status: 'submittedDenied'
      });
      enqueueSnackbar('Proposal successfully denied', snack.success);
    } catch (err) {
      enqueueSnackbar('Proposal status was not changed', snack.error);
    }
    update();
  };

  handlePageChange = (event, newPage) => {
    this.setState({page: newPage});
  }

  handleRowChange = (event) => {
    this.setState({page: 0, rowsPerPage: event.target.value});
  }

  mapStatus = (status) => {
    if (status === 'notSubmitted') {
      return <div>Not Submitted</div>;
    }
    if (status === 'submittedPending') {
      return <div>Waiting for Approval</div>;
    }
    if (status === 'submittedApproved') {
      return <div>Approved</div>;
    }
    if (status === 'submittedDenied') {
      return <div>Denied</div>;
    }
    return <div>Status Unknown</div>;
  };

  render() {
    const {proposals, action, title, update} = this.props;
    const {page, rowsPerPage} = this.state;

    return (
      <div className={gStyle.mainContentBorder}>
        {proposals.length > 0 &&
          <div>
            <Grid container direction='row' alignItems='flex-end' justify='space-between'>
              <Grid item align='left' className={gStyle.gridListContainer}>
                <Typography variant='h4'>{title}</Typography>
              </Grid>
            </Grid>
            <br/>
            <TableContainer component={Paper} className={gStyle.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project title</TableCell>
                    <TableCell align='right'>Status</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {proposals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell component='th' scope='row'>
                        {proposal.projectTitle}
                      </TableCell>
                      <TableCell align='right'>{this.mapStatus(proposal.status)}</TableCell>
                      <TableCell align='right'>
                        {action === 'review' &&
                          <div>
                            <ViewAProposal proposal={proposal}/>
                            <Button onClick={(e) => this.handleApprove(e, proposal._id)}>Approve</Button>
                            <Button onClick={(e) => this.handleDeny(e, proposal._id)}>Deny</Button>
                          </div>
                        }
                        {action === 'approved' &&
                          <div>
                            <ViewAProposal proposal={proposal}/>
                          </div>
                        }
                        {action === 'personal' &&
                          <Grid container justify='flex-end'>
                            <ProposalForm
                              title='Edit'
                              proposal={proposal}
                              update={update}
                            >Edit
                            </ProposalForm>
                            <Button onClick={(e) => this.handleDelete(e, proposal.id)}>Delete</Button>
                          </Grid>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>

              </Table>
              <TablePagination
                colSpan={3}
                count={proposals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                rowsPerPageOptions={[5, 10, 20]}
                onChangePage={this.handlePageChange}
                onChangeRowsPerPage={this.handleRowChange}
                component='div'
              />
            </TableContainer>
          </div>
        }
      </div>
    );
  }
}

ReviewTable.propTypes = {
  proposals: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      projectTitle: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(ReviewTable);
