import {Box, Button, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useEffect, useState} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Link as RouterLink} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import {passwordMatch, validateEmail, validatePassword, validateUsername} from '../../utils/validation';
import routes from '../../utils/Routing/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const Register = () => {
  const {register} = useContext(AuthContext);
  const [state, setState] = useState({identifier: '', password: '', remember: true, passwordInvalid: ''});
  const classes = useStyles();
  const {identifier,
    password,
    confirmPassword,
    fullName,
    email} = state;

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => passwordMatch(password, value));
    ValidatorForm.addValidationRule('passwordLength', (value) => validatePassword(value));
    ValidatorForm.addValidationRule('uniqueUsername', (value) => validateUsername(value));
    ValidatorForm.addValidationRule('validEmail', (value) => validateEmail(value));
    return function cleanup() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('passwordLength');
      ValidatorForm.removeValidationRule('uniqueUsername');
      ValidatorForm.removeValidationRule('validEmail');
    };
  });

  const handleChange = (event) => {
    const {checked, value, name, type} = event.target;
    setState({...state, [name]: type === 'checkbox' ? checked : value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {'username': identifier, password, 'Fullname': fullName, email};
    register(user);
  };

  return (
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register as a Sponsor
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <TextValidator
                fullWidth
                label='Username'
                name='identifier'
                type='text'
                autoFocus
                value={identifier}
                onChange={handleChange}
                helperText='This will be used to log in.'
                validators={['required', 'uniqueUsername']}
                errorMessages={['A username is required.', 'That username is not unique. Please try another.']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                fullWidth
                label='Full Name'
                name='fullName'
                type='text'
                autoFocus
                value={fullName}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Your full name is required.']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                fullWidth
                label='Email'
                name='email'
                type='text'
                autoFocus
                value={email}
                onChange={handleChange}
                validators={['required', 'validEmail']}
                errorMessages={['An email is required.', 'The email is invalid.']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                fullWidth
                label='Password'
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
                validators={['required', 'passwordLength']}
                errorMessages={['A password is required.', 'Minimum 6 character length.']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                fullWidth
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={handleChange}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['The password confirmation is required.', 'The passwords do not match.']}
              />
            </Grid>
            <Grid item>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Register
              </Button>

            </Grid>
          </Grid>
        </ValidatorForm>
        <Link component={RouterLink} to={routes.auth.login.path}>
          Return to login screen
        </Link>
      </div>
    </Box>
  );
};

export default Register;
