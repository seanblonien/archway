import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {imageURL} from "../../utils/utils";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";
import {TextFieldProps} from "@material-ui/core";
import {TextValidator} from "react-material-ui-form-validator";



const MemberInformation = ( props ) => {

  const renderInput = (props: TextFieldProps): any => (
    <TextValidator
      validators={['required', 'isProfane'] }
      errorMessages={['this field is required', 'contains illegal word']}
      label='Search for Team Members'
      variant='outlined'
      {...props}
    />
  );

  const [selectUser, setSelectUser] = useState('');

  const handleSelectUser = (event, values) => {
    setSelectUser(values);
  };

  const defaultProps = {
    options: props.AllUsers,
    getOptionLabel: (option) => {
      if (option.Fullname) {
        return option.Fullname;
      }
      else {
        return "";
      }
    }
  };

  const displayUser = (participant, canDelete=true) => {
    if (!participant.picture) {
      return (
        <ListItem
          key={participant.id}
          alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <EmojiPeopleIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={participant.Fullname}
            secondary={participant.email}
          />
          {canDelete &&
            <ListItemSecondaryAction>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => props.handleRemoveTeammate(participant.id)}/>
              </IconButton>
            </ListItemSecondaryAction>
          }
        </ListItem>);
    }
    else {
      return (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={participant.Fullname} src={imageURL.user(participant.picture)} />
          </ListItemAvatar>
          <ListItemText
            primary={participant.Fullname}
            secondary={participant.email}
          />
          {canDelete &&
            <ListItemSecondaryAction>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => props.handleRemoveTeammate(participant.id)}/>
              </IconButton>
            </ListItemSecondaryAction>
          }
        </ListItem>
      );
    }
  };

  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card className={props.classes.card}>
          <CardContent>
            <Grid container  alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <Grid container  justify='center' alignItems='center'>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' spacing={3} direction='row'>
                      <Tooltip title='Search for name' arrow>
                        <Grid item xs={8}>
                          <Autocomplete
                            id='searchTeamMember'
                            {...defaultProps}
                            style={{width: 300}}
                            value={selectUser}
                            onChange={handleSelectUser}
                            renderInput={renderInput}
                          />
                        </Grid>
                      </Tooltip>
                      <Grid item>
                        <Button variant='outlined' color='primary' onClick={() => {
                          props.handleConfirmTeammate(selectUser);
                          setSelectUser('');
                        }}>
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>
                  {/* team list */}
                  <Grid item xs={9}>
                    <List>
                    {props.Participants.map(participant => displayUser(participant))
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
        <Card className={props.classes.card}>
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
                    <Grid item >
                      <Tooltip title='Search for name' arrow>
                          <Autocomplete
                            id='searchProf'
                            {...defaultProps}
                            style={{width: 300}}
                            onChange={props.handleSelectedPerson('selectedProfessor')}
                            renderInput={renderInput}
                          />
                      </Tooltip>
                    </Grid>
                    <Grid>
                      {(props.selectedProfessor && props.selectedProfessor !== '') && displayUser(props.selectedProfessor, false)}
                    </Grid>
                  </Grid>
                  </Grid>
                  {/* search TA */}
                  <Grid item>
                  <Grid container alignItems='center' justify='center' spacing={2} direction='row'>
                  <Grid item >
                    <Tooltip title='Search for name' arrow>
                        <Autocomplete
                          id='searchTA'
                          {...defaultProps}
                          style={{width: 300}}
                          onChange={props.handleSelectedPerson('selectedTA')}
                          renderInput={renderInput}
                        />
                    </Tooltip>
                  </Grid>
                    <Grid item>
                      {(props.selectedTA && props.selectedTA !== '') && displayUser(props.selectedTA, false)}
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

export default MemberInformation;