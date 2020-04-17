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
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const PeopleSelect = ( props ) => {

  /*
  * allUsers
  * props
  * handleConfirmTeammate - handleConfirmUser
  * handleClickDialogOpen
  * selectedPeople
  */

  const [selectUser, setSelectUser] = useState('');

  const {title, allUsers, selectedPeople, handleRemove, handleConfirmUser} = props;

  const handleSelectUser = (event, values) => {
    setSelectUser(values);
  };

  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card>
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <Typography>{title}</Typography>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems='center'>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' spacing={3} direction='row'>
                      <Tooltip title='Search for name' arrow>
                        <Grid item xs={8}>
                          <Autocomplete
                            id='combo-box-demo'
                            options={allUsers}
                            getOptionLabel={(option) => option.Fullname}
                            style={{width: 300}}
                            onChange={handleSelectUser}
                            renderInput={(params) => <TextField {...params} label='Search for Team Members' variant='outlined'/>}
                          />
                        </Grid>
                      </Tooltip>
                      <Grid item>
                        <Button variant='outlined' color='primary' onClick={() => handleConfirmUser(selectUser)}>
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>
                  {/* team list */}
                  <Grid item xs={9}>
                    {selectedPeople.map(participant =>(<ListItem key={participant.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <EmojiPeopleIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.Fullname}
                      />
                      <Button onClick={ () => handleRemove(participant)}>Remove</Button>
                    </ListItem>))
                    }
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

PeopleSelect.propTypes = {
  title: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.shape({
      Fullname: PropTypes.string.isRequired})).isRequired,
  selectedPeople: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired})).isRequired,
  handleConfirmUser: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default PeopleSelect;