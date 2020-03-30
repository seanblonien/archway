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
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import ViewAProposal from '../Components/ViewAProposal';

class ReviewProposals extends Component {
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

        // TODO add capstones
        this.state = {
            loading: true,
            proposals: []
        };
    }

    async componentDidMount() {
        const proposals = await api.proposals.find();

        this.setState({loading: false, proposals});
    }

    render() {
        const {classes} = this.props;
        const {loading, proposals} = this.state;

        if (!loading) {
            return (
                    <Grid container justify='center'>
                        <Grid item md={10} xs={12}>
                            <Grid container direction='row' alignItems='flex-end' justify='space-between'>
                                <Grid item align='left'>
                                    <Typography variant='h4' style={{marginTop: '16px'}}>Pending Proposals</Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            {proposals.length > 0 &&
                            <TableContainer component={Paper}>
                                <Table aria-label='simple table'>
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
                                                    <ViewAProposal></ViewAProposal>
                                                    <Button>Approve</Button>
                                                    <Button>Deny</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            }

                            <Grid item align='left'>
                                <Typography variant='h4'>Approved Proposals</Typography>
                            </Grid>

                            {proposals.length > 0 &&
                            <TableContainer component={Paper}>
                                <Table aria-label='simple table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Project title</TableCell>
                                            <TableCell align='right'>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {proposals.map((proposal, index) => (
                                            <TableRow key={index}>
                                                <TableCell component='th' scope='row'>
                                                    {proposal.projectTitle}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Button>View</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            }
                        </Grid>
                    </Grid>
            );
        }

        return <LoadingCircle/>;
    }
}

export default compose(
    withWidth(),
)(ReviewProposals);
