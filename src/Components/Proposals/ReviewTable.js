import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import ViewAProposal from './ViewAProposal';
import ProposalForm from "./ProposalForm";

class ReviewTable extends Component {
    static getColumns(props) {
        if(props.width === 'xl') {
            return 4;
        }if(props.width === 'lg') {
            return 4;
        }if(props.width ==='md') {
            return 3;
        }
        return 2;
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {

    }

    mapStatus(status) {
        if (status === 'notSubmitted') {
            return <div>'Not Submitted'</div>
        }
        if (status === 'submittedUnapproved') {
            return <div>Waiting for Approval</div>
        }
        if (status === 'submittedApproved') {
            return <div>Approved</div>
        }
        if (status === 'submittedDenied') {
            return <div>Denied</div>
        }
    }

    handleDelete(id) {

    }

    handleApprove(id) {

    }

    handleDeny(id) {

    }

    render() {
        const { proposals, action, title } = this.props;



        return (
          <div>
                    <Grid container direction='row' alignItems='flex-end' justify='space-between'>
                        <Grid item align='left'>
                            <Typography variant='h4'>{title}</Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    {proposals.length > 0 &&
                    <TableContainer component={Paper}>
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
                                        <TableCell align='right'>{proposal.status}</TableCell>
                                        <TableCell align='right'>
                                            {action === 'review' &&
                                                <div>
                                                    <ViewAProposal proposal={proposal}/>
                                                    <Button > Approve </Button>
                                                    <Button>Deny</Button>
                                                </div>
                                            }
                                            {action === 'approved' &&
                                            <div>
                                                <ViewAProposal proposal={proposal}/>
                                            </div>
                                            }
                                            {action === 'personal' &&
                                            <div>
                                                <ProposalForm proposal={proposal}>Edit</ProposalForm>
                                                <Button>Delete</Button>
                                            </div>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
          </div>
        );
    }
}

export default compose(
    withWidth(),
)(ReviewTable);
