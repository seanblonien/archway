import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import ViewAProposal from './ViewAProposal';
import ProposalForm from './ProposalForm';
import gStyle from '../../utils/styles.module.css';
import TablePagination from '@material-ui/core/TablePagination';

class ReviewTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }

  }

  handleDelete = async (e, id) => {
    await api.proposals.delete(id);
  };

  handleApprove = async (e, id) => {
    await api.proposals.update(id, {
      status: 'submittedApproved'
    });
  };

  handleDeny = async (e, id) => {
    await api.proposals.update(id, {
      status: 'submittedApproved'
    });
  };

  mapStatus = (status) => {
    if (status === 'notSubmitted') {
      return <div>Not Submitted</div>;
    }
    if (status === 'submittedUnapproved') {
      return <div>Waiting for Approval</div>;
    }
    if (status === 'submittedApproved') {
      return <div>Approved</div>;
    }
    if (status === 'submittedDenied') {
      return <div>Denied</div>;
    }
    return <div>Status Unknown</div>;
  }

  render() {
    const {proposals, action, title} = this.props;
    const {page} = this.state;

    return (
      <div>
        <Grid container direction='row' alignItems='flex-end' justify='space-between'>
          <Grid item align='left'>
            <Typography variant='h4'>{title}</Typography>
          </Grid>
        </Grid>
        <br/>
        {proposals.length > 0 &&
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
                {proposals.map((proposal, index) => (
                  <TableRow key={index}>
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
                        <div>
                          <ProposalForm title='Edit' proposal={proposal}>Edit</ProposalForm>
                          <Button onClick={(e) => this.handleDelete(e, proposal.id)}>Delete</Button>
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={Math.ceil(proposals.length/10)}
                    rowsPerPage={10}
                    page={page}
                    rowsPerPageOptions={10}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        }
      </div>
    );
  }
}

ReviewTable.propTypes = {
  proposals: PropTypes.isRequired,
  action: PropTypes.isRequired,
  title: PropTypes.isRequired
};

export default compose(
  withWidth(),
)(ReviewTable);
