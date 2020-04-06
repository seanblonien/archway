import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../Services/api';
import ReviewTable from '../Components/Proposals/ReviewTable';
import ProposalForm from '../Components/Proposals/ProposalForm';

class ReviewProposals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pending: [],
      approved: [],
    };
  }

  async componentDidMount() {
    //const user = this.context;
    const proposals = await api.proposals.find();
    const approved = [];
    const pending = [];

    //load desired arrays of proposals
    for (const proposal of proposals) {
      if (proposal.status === 'submittedApproved') {
        approved.push(proposal);
      } else if (proposal.status === 'submittedPending') {
        pending.push(proposal);
      }
    }

    this.setState({pending, approved});
  }

  render() {
    const {pending, approved} = this.state;

    return (
      <div>
        {/*create a new proposal from empty form}*/}
        <ProposalForm title='New Proposal' proposal={null}/>
        {/*table for sponsors, only their created proposals*/}
        <ReviewTable title='Your Proposals' proposals={pending} action='personal'/>
        {/*table for admin to view and approve pending proposals*/}
        <ReviewTable title='Pending Proposals' proposals={pending} action='review'/>
        {/*table to view approved proposals, so they can be contacted*/}
        <ReviewTable title='Approved Proposals' proposals={approved} action='approved'/>
      </div>
    );
  }
}

export default compose(
  withWidth(),
)(ReviewProposals);
