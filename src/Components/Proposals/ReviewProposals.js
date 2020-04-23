import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import Box from '@material-ui/core/Box';
import api from '../../Services/api';
import ReviewTable from './ReviewTable';
import AuthContext from '../../Contexts/AuthContext';

class ReviewProposals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pending: [],
      approved: [],
    };
  }

  async componentDidMount() {
    this.initProposals();
  }

  initProposals = async () => {
    const {user} = this.context;
    const response = await api.users.find({username: user.username});
    const profileData = response[0];
    const proposals = await api.proposals.find();

    const approved = [];
    const pending = [];

    if (profileData.department) {
      for (const proposal of proposals) {
        if (proposal.departments.some(item => profileData.department.id === item.id)) {
          if (proposal.status === 'submittedApproved') {
            approved.push(proposal);
          } else if (proposal.status === 'submittedPending') {
            pending.push(proposal);
          }
        }
      }
    } else {
      for (const proposal of proposals) {
        if (proposal.status === 'submittedApproved') {
          approved.push(proposal);
        } else if (proposal.status === 'submittedPending') {
          pending.push(proposal);
        }
      }
    }

    this.setState({pending, approved});
  };

  render() {
    const {pending, approved} = this.state;

    return (
      <div>
        <Box width='80%' my={2}>
          <ReviewTable
            title='Pending Proposals'
            proposals={pending}
            update={this.initProposals}
            action='review'
          />
        </Box>
        <Box width='80%' my={2}>
          <ReviewTable
            title='Approved Proposals'
            proposals={approved}
            update={this.initProposals}
            action='approved'
          />
        </Box>
      </div>
    );
  }
}

ReviewProposals.contextType = AuthContext;

export default compose(
  withWidth(),
)(ReviewProposals);
