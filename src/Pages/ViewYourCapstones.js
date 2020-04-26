import React, {Component} from 'react';
import _ from 'lodash';
import CapstonesTab from '../Components/Capstone/CapstonesTab';
import GridBox from '../Components/LayoutWrappers/GridBox';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import LoadingCircle from '../Components/LoadingCircle';
import SectionTitle from '../Components/Typography/SectionTitle';
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
    const {studentCapstones, professorCapstones} = await api.users.findOne(user.id);
    const capstones = _.uniqBy([...studentCapstones, ...professorCapstones], 'id');
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
            <SectionTitle>Your Capstones</SectionTitle>
            {capstones &&
              <CapstonesTab capstones={capstones}/>
            }
          </GridBox>
        </GridPageContainer>
    );
  }
}

ViewYourCapstones.contextType = AuthContext;

export default ViewYourCapstones;
