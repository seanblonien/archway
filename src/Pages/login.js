import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import auth from '../Auth';

const Login = ({name}) => (
  <div>
    <p className='App-intro'>
      Hello, {name}<br/>
      Do you want to see the secret area? <Link to='/secret'>Click here </Link>
    </p>

    {!auth.isAuthenticated() &&
      <div>
        <hr/>
        Please login first
        <hr/>
        <button onClick={auth.login} type='button'>Login</button>
      </div>
    }

  </div>
);

Login.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Login;
