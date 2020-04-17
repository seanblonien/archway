import {Box, Button, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useEffect, useState} from 'react';
import EmailIcon from '@material-ui/icons/Email';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Link as RouterLink} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import {validateEmail} from '../../utils/validation';
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

const ForgotPassword = () => {
  const {forgotPassword} = useContext(AuthContext);
  const [state, setState] = useState({email: ''});
  const classes = useStyles();
  const {email} = state;

  useEffect(() => {
    ValidatorForm.addValidationRule('validEmail', (value) => validateEmail(value));
    return function cleanup() {
      ValidatorForm.removeValidationRule('validEmail');
    };
  });

  const handleChange = (event) => {
    const {value, name} = event.target;
    setState({[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Forgot Password
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Send Password Reset Email
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
        <Link component={RouterLink} to={routes.auth.login.path}>
          Return to login screen
        </Link>
        <Link component={RouterLink} to={routes.auth.resetpassword.path}>
          I already have my unique code from my email
        </Link>
      </div>
    </Box>
  );
};

export default ForgotPassword;
