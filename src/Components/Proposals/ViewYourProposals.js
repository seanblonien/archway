import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../../Services/api';
import ReviewTable from './ReviewTable';
import ProposalForm from './ProposalForm';
import Box from "@material-ui/core/Box";
import AuthContext from "../../Contexts/AuthContext";

class ViewYourProposals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      proposals: []
    };
  }

  async componentDidMount() {
    this.initProposals();
  }

  initProposals = async () => {
    const {user} = this.context;
    const proposals = await api.proposals.find({creator: user.id});
    this.setState({proposals});
  };

  render() {
    const {proposals} = this.state;

    return (
      <div>
        {/*create a new proposal from empty form}*/}
        <ProposalForm
          title='New Proposal'
          update={this.initProposals}
          proposal={null}/>
        {/*table for sponsors, only their created proposals*/}
        <Box width='80%' my={2}>
          <ReviewTable
            title='Your Proposals'
            proposals={proposals}
            update={this.initProposals}
            action='personal'/>
        </Box>
      </div>
    );
  }
}

ViewYourProposals.contextType = AuthContext;

export default compose(
  withWidth(),
)(ViewYourProposals);
