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

const styles = (theme) => ({
  proposalPaper:{
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    outline: 'none',
  },
});

class ReviewTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    }
  }

  handleDelete = async (e, id) => {
    const {update} = this.props;
    await api.proposals.delete(id);
    update();
  };

  handleApprove = async (e, id) => {
    const {update} = this.props;
    await api.proposals.update(id, {
      status: 'submittedApproved'
    });
    update();
  };

  handleDeny = async (e, id) => {
    const {update} = this.props;
    await api.proposals.update(id, {
      status: 'submittedDenied'
    });
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
  }

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
                {proposals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((proposal) => {
                  return (
                    <TableRow key={proposal.name}>
                      <TableCell component='th' scope='row'>
                        {proposal.projectTitle}
                      </TableCell>
                      <TableCell align='right'>{this.mapStatus(proposal.status)}</TableCell>
                      <TableCell align='right'>
                        {action === 'review' &&
                        <div>
                          <ViewAProposal
                            proposal={proposal}
                            update={update}
                          />
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
                          <ProposalForm
                            title='Edit'
                            proposal={proposal}
                            update={update}
                          >Edit</ProposalForm>
                          <Button onClick={(e) => this.handleDelete(e, proposal.id)}>Delete</Button>
                        </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={proposals.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[5, 10, 20]}
                    onChangePage={this.handlePageChange}
                    onChangeRowsPerPage={this.handleRowChange}
                    component="div"
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          </div>
          }
      </div>
    );
  }
}

ReviewTable.propTypes = {
  proposals: PropTypes.array,
  action: PropTypes.string,
  title: PropTypes.string
};

export default compose(
  withWidth(),
)(ReviewTable);
