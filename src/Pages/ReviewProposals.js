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
    const proposals = await api.proposals.find();
    const approved = [];
    const pending = [];

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
        <ProposalForm title='New Proposal' proposal={null}/>
        <ReviewTable title='Your Proposals' proposals={pending} action='personal'/>
        <ReviewTable title='Pending Proposals' proposals={pending} action='review'/>
        <ReviewTable title='Approved Proposals' proposals={approved} action='approved'/>
      </div>
    );
  }
}

export default compose(
  withWidth(),
)(ReviewProposals);
