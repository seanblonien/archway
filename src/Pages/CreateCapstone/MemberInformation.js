import Avatar from '@material-ui/core/Avatar';
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
import React from 'react';
import _ from 'lodash';
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
      label='Search for Professors and TA'
      variant='outlined'
      validators={['haveProfessor'] }
      errorMessages={['Must select a professor']}
      {...inputProps}
    />
  );

  const {AllUsers, AllProfessors, classes, students, professors,
    setStudents, setProfessors,
  } = props;

  const defaultPropsStudents = {
    // options: AllUsers,
    options: _.differenceWith(AllUsers, students, _.isEqual),
    getOptionLabel: (option) => {
      if (option.Fullname) {
        return option.Fullname;
      }
      return '';
    }
  };

  const defaultPropsProfessors = {
    options: _.differenceWith(AllProfessors, professors, _.isEqual),
    getOptionLabel: (option) => {
      if (option.Fullname) {
        return option.Fullname;
      }
      return '';
    }
  };

  const displayUser = (participant, canDelete=true, participants, setParticipants) => (
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
          <IconButton aria-label='delete' onClick={() => setParticipants(participants.filter(s => s.id !== participant.id))}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>);

  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
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
                    <Tooltip title='Search for name' arrow>
                      <FormControl margin='dense' fullWidth variant='filled'>
                        <Autocomplete
                          id='Search for Student Team Members'
                          {...defaultPropsStudents}
                          value={null}
                          onChange={(event, value) => {
                            setStudents([...students, value]);
                          }}
                          renderInput={renderInputForMembers}
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  {/* team list */}
                  <Grid item xs={9}>
                    <List>
                      {students.map(member => displayUser(member, true, students, setStudents))}
                    </List>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Professors and Teaching Assitants' align='left' size='h5'/>
                <Divider/>
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems='center' spacing={6}>
                  {/* search professor */}
                  <Grid item xs={12}>
                    <Grid container alignItems='center' justify='center' spacing={2}>
                      <Grid item xs={12}>
                        <Tooltip title='Search for name' arrow>
                          <Autocomplete
                            {...defaultPropsProfessors}
                            value={null}
                            onChange={(event, value) => {
                              setProfessors([...professors, value]);
                            }}
                            renderInput={renderInputForProfessor}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid>
                        {professors.map(member => displayUser(member, true, professors, setProfessors))}
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

const arrayOfPersons = PropTypes.arrayOf(
  PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired
);

MemberInformation.propTypes = {
  AllUsers: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired).isRequired,
  AllProfessors: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string,
    picture: PropTypes.shape({url: PropTypes.string, id: PropTypes.string})
  }).isRequired).isRequired,
  students: arrayOfPersons.isRequired,
  professors: arrayOfPersons.isRequired,
  setStudents: PropTypes.func.isRequired,
  setProfessors: PropTypes.func.isRequired
};

export default MemberInformation;
