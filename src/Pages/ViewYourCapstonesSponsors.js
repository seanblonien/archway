/*
Filename: ViewYourCapstones.js
Contributors:
Brenden Detels- All functionality
Stephen Tate - Gridlist layout and bug fixes
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {strapiURL, strapi} from "../constants";
import LoadingCircle from "../Components/LoadingCircle";
import ProposalForm from "../Components/ProposalForm"
import Divider from '@material-ui/core/Divider';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        raised: true,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 100,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

function createData(title, status) {
    return { title, status};
  }
  

const rows = [
    createData('New Proposal', "Unsubmitted"),
    createData('Ice cream sandwich', "Waiting for approval"),
    createData('Eclair', "Approved"),
  ];

class ViewYourCapstonesSponsors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            capstones: [],
            pastCapstones: [],
            currentCapstones: [],
            proposals: []
        }
    }
    async componentDidMount() {
        const currentProposals = await strapi.getEntries('proposals');  

        this.setState({loading: false, proposals: currentProposals});
    }


    static getColumns(props) {
        if(props.width === 'xl'){
            return 4;
        }else if(props.width === 'lg'){
            return 4;
        }else if(props.width ==='md'){
            return 3;
        }

        return 2;
    }

    static handleTileClick(capstoneName){
        window.location = "/ViewCapstone/" + capstoneName;
    }

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            return (
                <div className="Blogpost">

                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Grid container direction="row" alignItems="flex-end" justify="space-between">
                                <Grid item align="left">
                                <Typography variant="h4" style={{marginTop: '16px'}}>Pending Company Projects</Typography>
                                </Grid>
                                <Grid item align="right">
                                <ProposalForm></ProposalForm>
                                </Grid>
                            </Grid>
                            <br/>
                            {this.state.proposals.length > 0 &&
                            <TableContainer component={Paper} className={classes.table}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Project title</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.proposals.map((proposal, index) => (
                                        <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {proposal.projectTitle}
                                        </TableCell>
                                        <TableCell align="right">{proposal.status}</TableCell>
                                        <TableCell align="right">
                                            <Button>Edit</Button>    
                                            <Button>Delete</Button>    
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            }           
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Current Company Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>


                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Past Company Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else{
            return (<div>
                < LoadingCircle />
            </div>);

        }
    }
}

export default compose(
    withStyles(styles),
    withWidth(),
)(ViewYourCapstonesSponsors);
