import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TextValidator} from 'react-material-ui-form-validator';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {imageURL} from '../../utils/utils';

const MemberInformation = ( props ) => {

  const renderInputForMembers = (inputProps) => (
    <TextValidator
      validators={['haveMembers']}
      errorMessages={['Must select at least one']}
      label='Search for Team Members'
      variant='outlined'
      {...inputProps}
    />
  );

  const renderInputForProfessor = (inputProps) => (
    <TextValidator
      label='Search for Professor'
      variant='outlined'
      validators={['haveProfessor'] }
      errorMessages={['Must select a professor']}
      {...inputProps}
    />
  );

  const renderInputForTA = (inputProps) => (
    <TextValidator
      label='Search for TA'
      variant='outlined'
      validators={['haveTA'] }
      errorMessages={['Must select a TA']}
      {...inputProps}
    />
  );

  const [selectUser, setSelectUser] = useState('');

  const {AllUsers, classes, members, selectedProfessor, selectedTA,
    handleConfirmTeammate, handleSelectedPerson, handleRemoveTeammate
  } = props;

  const handleSelectUser = (event, values) => {
    setSelectUser(values);
  };

  const defaultProps = {
    options: AllUsers,
    getOptionLabel: (option) => {
      if (option.Fullname) {
        return option.Fullname;
      }
      return '';
    }
  };

  const displayUser = (participant, canDelete=true) => (
    <ListItem
      key={participant.id}
      alignItems='flex-start'
    >
      <ListItemAvatar>
        <Avatar alt={participant.Fullname} src={imageURL.user(participant.picture)}/>
      </ListItemAvatar>
      <ListItemText
        primary={participant.Fullname}
        secondary={participant.email}
      />
      {canDelete &&
        <ListItemSecondaryAction>
          <IconButton aria-label='delete' onClick={() => handleRemoveTeammate(participant.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>);

  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container  alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <Grid container  justify='center' alignItems='center'>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' spacing={1} direction='row'>
                      <Grid item xs={8}>
                        <Tooltip title='Search for name' arrow>
                          <FormControl margin='dense' fullWidth variant='filled'>
                          <Autocomplete
                            id='Search for Team Members'
                            {...defaultProps}
                            style={{width: 300}}
                            onChange={handleSelectUser}
                            renderInput={renderInputForMembers}
                          />
                        </FormControl>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant='outlined' color='primary' onClick={() => {
                            handleConfirmTeammate(selectUser);
                            setSelectUser('');
                          }}
                        >
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* team list */}
                  <Grid item xs={9}>
                    <List>
                      {members.map(member => displayUser(member))
                      }
                    </List>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12} md={10}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Staff Information' align='left' size='h5'/>
                <Divider/>
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems='center' spacing={6}>
                  {/* search professor */}
                  <Grid item>
                    <Grid container alignItems='center' justify='center' spacing={2} direction='row'>
                      <Grid item>
                        <Tooltip title='Search for name' arrow>
                          <Autocomplete
                            id='Search for Professor'
                            {...defaultProps}
                            style={{width: 300}}
                            onChange={handleSelectedPerson('selectedProfessor')}
                            renderInput={renderInputForProfessor}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid>
                        {(selectedProfessor && selectedProfessor !== '') && displayUser(selectedProfessor, false)}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* search TA */}
                  <Grid item>
                    <Grid container alignItems='center' justify='center' spacing={2} direction='row'>
                      <Grid item>
                        <Tooltip title='Search for name' arrow>
                          <Autocomplete
                            id='Search for TA'
                            {...defaultProps}
                            style={{width: 300}}
                            onChange={handleSelectedPerson('selectedTA')}
                            renderInput={renderInputForTA}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        {(selectedTA && selectedTA !== '') && displayUser(selectedTA, false)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

MemberInformation.propTypes = {
  AllUsers: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired).isRequired,
  selectedTA: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      Fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
    })
  ]),
  selectedProfessor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      Fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
    })
  ]),
  handleConfirmTeammate: PropTypes.func.isRequired,
  handleSelectedPerson: PropTypes.func.isRequired,
  handleRemoveTeammate: PropTypes.func.isRequired
};

MemberInformation.defaultProps = {
  selectedTA: '',
  selectedProfessor: '',
};

export default MemberInformation;