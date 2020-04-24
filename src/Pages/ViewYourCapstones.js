import React, {Component} from 'react';
import CapstonesTab from '../Components/CapstonesTab';
import GridBox from '../Components/LayoutWrappers/GridBox';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import LoadingCircle from '../Components/LoadingCircle';
import AuthContext from '../Contexts/AuthContext';
import api from '../Services/api';

class ViewYourCapstones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      capstones: [],
    };
  }

  async componentDidMount() {
    const {user} = this.context;
    const {capstones} = await api.users.findOne(user.id);
    this.setState({capstones, loading: false});
  }

  render() {
    const {loading, capstones} = this.state;

    return (
      loading
        ? <LoadingCircle/>
        :
        <GridPageContainer>
          <GridBox>
            <CapstonesTab capstones={capstones}/>
          </GridBox>
        </GridPageContainer>
    );
  }
}

ViewYourCapstones.contextType = AuthContext;

export default ViewYourCapstones;
