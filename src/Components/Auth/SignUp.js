import {Box, Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import React, {useContext, useEffect, useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import AuthContext from '../../Contexts/AuthContext';
import routes from '../../utils/Routing/routes';
import {passwordMatch, validateEmail, validatePassword, validateUsername} from '../../utils/validation';
import {verifyEmailInStrapi} from '../../utils/verification';
import {StyledLink} from '../Typography/StyledLink';

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

const SignUp = () => {
  const {signUp} = useContext(AuthContext);
  const [state, setState] = useState({identifier: '', password: '', confirmPassword: '', fullName: '', email: '', remember: true, passwordInvalid: ''});
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
    ValidatorForm.addValidationRule('unusedEmail', async (value) => !(await verifyEmailInStrapi(value)));
    return function cleanup() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('passwordLength');
      ValidatorForm.removeValidationRule('uniqueUsername');
      ValidatorForm.removeValidationRule('validEmail');
      ValidatorForm.removeValidationRule('unusedEmail');
    };
  });

  const handleChange = (event) => {
    const {checked, value, name, type} = event.target;
    setState({...state, [name]: type === 'checkbox' ? checked : value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {'username': identifier, password, 'Fullname': fullName, email};
    await signUp(user);
  };

  return (
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up as a <StyledLink to={routes.sponsors.path}>Sponsor</StyledLink>
        </Typography>
        <br/>
        <Box maxWidth='300px'>
          <Typography align='justify' variant='body2'>
            If you are a student, professor, or faculty member affiliated with the
            university, please contact the site administrator to get an account
            if you do not already have one.
          </Typography>
        </Box>
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
                value={email}
                onChange={handleChange}
                validators={['required', 'validEmail', 'unusedEmail']}
                errorMessages={['An email is required.', 'The email is invalid.', 'That email is already in use.']}
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
                Sign Up
              </Button>

            </Grid>
          </Grid>
        </ValidatorForm>
        <StyledLink to={routes.auth.login.path}>
          Return to login screen
        </StyledLink>
      </div>
    </Box>
  );
};

export default SignUp;
