import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../Services/api';
import ReviewTable from "../Components/Proposals/ReviewTable";
import ProposalForm from "../Components/Proposals/ProposalForm";

class ReviewProposals extends Component {

    constructor(props) {
        super(props);

        // TODO add capstones
        this.state = {
            loading: true,
            pending: [],
            approved: [],
        };
    }

    async componentDidMount() {
        const proposals = await api.proposals.find();
        let approved = [];
        let pending = [];

        for (let proposal of proposals) {
            if (proposal.status === 'sumbittedApproved') {
                approved.push(proposal);
            } else if (proposal.status === 'submittedUnapproved') {
                pending.push(proposal);
            }
        }

        this.setState({loading: false,
            proposals, pending: pending,
            approved: approved});
    }

    render() {
        const {pending, approved} = this.state;

        return (
                <Grid container justify='center'>
                    <Grid item md={10} xs={12}>
                        <ProposalForm proposal={null}/>
                        <ReviewTable title='Your Proposals' proposals={pending} action='personal'/>
                        <ReviewTable title='Pending Proposals' proposals={pending} action='review'/>
                        <ReviewTable title='Approved Proposals' proposals={approved} action='approved'/>
                    </Grid>
                </Grid>
        );
    }
}

export default compose(
    withWidth(),
)(ReviewProposals);
