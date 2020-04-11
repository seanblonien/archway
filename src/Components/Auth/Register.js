import {Box, TextField, Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useState} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AuthContext from '../../Contexts/AuthContext';
import Paper from '@material-ui/core/Paper';

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
  const [state, setState] = useState({identifier: '', password: '', remember: true});
  const classes = useStyles();

  const handleChange = (event) => {
    const {checked, value, name, type} = event.target;
    setState({...state, [name]: type === 'checkbox' ? checked : value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {identifier, password, remember} = state;
    // register(identifier, password, remember);
  };

  const {identifier, password, remember} = state;
  return (
    <Grid item xs={12} sm={8} md={6} xl={6} component={Paper} elevation={6} my={10}>
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register as a Sponsor
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <TextField
                fullWidth
                label='Username'
                name='identifier'
                type='text'
                autoComplete='username'
                autoFocus
                value={identifier}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label='Password'
                name='password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name='remember'
                    color='primary'
                    checked={remember}
                    onChange={handleChange}
                  />
                }
                label='Remember me'
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
            {/*<Grid item>*/}
            {/*  <Grid container direction='column'>*/}
            {/*    <Grid item xs>*/}
            {/*      <Link href='/' variant='body2'>*/}
            {/*        Forgot password? HAHA !*/}
            {/*      </Link>*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*      <Link href='/' variant='body2'>*/}
            {/*        {'Don\'t have an account? Sign Up'}*/}
            {/*      </Link>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
          </Grid>
        </form>
      </div>
    </Box>
    </Grid>
  );
};

export default Register;
