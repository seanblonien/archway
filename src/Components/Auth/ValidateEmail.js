import {Box} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Person';
import React from 'react';
import routes from '../../utils/Routing/routes';
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

const ValidateEmail = () => {
  const classes = useStyles();

  return (
    <Box alignItems='center' m={5} className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Please check your email for a confirmation link.
        </Typography>
        <StyledLink to={routes.auth.login.path}>
          Return to login screen
        </StyledLink>
      </div>
    </Box>
  );
};

export default ValidateEmail;
