import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import AuthContext from '../../Contexts/AuthContext';
import api from '../../Services/api';
import GridBox from '../LayoutWrappers/GridBox';
import GridPageContainer from '../LayoutWrappers/GridPageContainer';
import SectionTitle from '../Typography/SectionTitle';
import ProposalForm from './ProposalForm';
import ReviewTable from './ReviewTable';

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
      <GridPageContainer>
        <GridBox>
          <SectionTitle>Your Proposals</SectionTitle>
          <ReviewTable
            title='Your Proposals'
            proposals={proposals}
            update={this.initProposals}
            action='personal'
          />
          <ProposalForm
            title='New Proposal'
            update={this.initProposals}
            proposal={null}
          />
        </GridBox>
      </GridPageContainer>
    );
  }
}

ViewYourProposals.contextType = AuthContext;

export default compose(
  withWidth(),
)(ViewYourProposals);
