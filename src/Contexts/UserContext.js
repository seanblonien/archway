import PropTypes from 'prop-types';
import React, {Component} from 'react';
import api from '../Services/api';

const UserContext = React.createContext({});

class UserProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  async componentDidMount () {
    const id = localStorage.getItem('id_token');
    if(id){
      const user = await api.users.findOne(id);
      this.setState({user});
    }
  }

  setUser = async (user) => {
    if(user) {
      this.setState({user});
      await api.users.update(user.id, user);
    }
  };

  render() {
    const {children} = this.props;
    const {user} = this.state;
    const {setUser} = this;

    return (
      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserContext;

export {UserProvider};
