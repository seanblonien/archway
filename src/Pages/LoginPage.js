import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../Contexts/AuthProvider';

const LoginPage = ({name}) => {
  const {isAuthenticated, login} = useContext(AuthContext);

  return (
    <div>
      <p className='App-intro'>
        Hello, {name}<br/>
        Do you want to see the secret area? <Link to='/secret'>Click here </Link>
      </p>

      {isAuthenticated &&
        <div>
          <hr/>
          Please login first
          <hr/>
          <button onClick={login} type='button'>Login</button>
        </div>
      }

    </div>
  );
};

LoginPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default LoginPage;
