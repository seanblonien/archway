import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../../Services/api';
import UserGrid from '../Capstone/UserGrid';
import SectionTitle from '../Typography/SectionTitle';

class Professors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors: [],
    };
  }

  async componentDidMount() {
    const {department} = this.props;
    const professors = await api.users.find({department: {id: department.id}});
    this.setState({professors});
  }

  render () {
    const {professors} = this.state;

    return (
      professors[0] ?
        <div>
          <SectionTitle>Professors</SectionTitle>
          <UserGrid userList={professors}/>
        </div>
        : null
    );
  }
}

Professors.propTypes = {
  department: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
};

export default Professors;
