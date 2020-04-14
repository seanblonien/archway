import {Box, Button, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useEffect, useState} from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Link as RouterLink} from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import {passwordMatch, validatePassword} from '../../utils/validation';
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

const ResetPassword = () => {
  const {resetPassword} = useContext(AuthContext);
  const [state, setState] = useState({password: ''});
  const classes = useStyles();
  const {code, password, passwordConfirmation} = state;

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => passwordMatch(password, value));
    ValidatorForm.addValidationRule('passwordLength', (value) => validatePassword(value));
    return function cleanup() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('passwordLength');
    };
  });

  const handleChange = (event) => {
    const {value, name} = event.target;
    setState({[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(code, password, passwordConfirmation);
  };

  return (
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <TextValidator
                fullWidth
                label='Unique Code (check email)'
                name='code'
                type='text'
                autoFocus
                value={code}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['The unique code is required.']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                fullWidth
                label='New Password'
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
                label='Confirm New Password'
                name='confirmPassword'
                type='password'
                value={passwordConfirmation}
                onChange={handleChange}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['The new password confirmation is required.', 'The passwords do not match.']}
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
                Confirm new password
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

export default ResetPassword;
