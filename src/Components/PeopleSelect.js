import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const PeopleSelect = ({title, users, selectedUsers, setSelectedUsers}) => {
  const [selectUser, setSelectUser] = useState(null);
  const unselectedUsers = _.differenceBy(users, selectedUsers, 'id');

  return (
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
                    id={title}
                    options={unselectedUsers}
                    getOptionLabel={(option) => option.Fullname}
                    getOptionSelected={(option, value) => option.id === value.id}
                    style={{width: 300}}
                    value={selectUser}
                    onChange={(event, value) =>
                      setSelectUser(value)
                    }
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        label='Search for Peofessors'
                        variant='outlined'
                      />
                    }
                  />
                </Grid>
              </Tooltip>
              <Grid item>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => {
                    setSelectedUsers([...selectedUsers, selectUser]);
                    setSelectUser(null);
                  }}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>

          </Grid>
          {/* team list */}
          <Grid item xs={9}>
            {selectedUsers.map(participant =>
              <ListItem key={participant.id}>
                <ListItemAvatar>
                  <Avatar>
                    <EmojiPeopleIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={participant.Fullname}/>
                <Button
                  onClick={() =>
                    setSelectedUsers([...selectedUsers.filter(u => u.id !== participant.id)])
                  }
                >
                  Remove
                </Button>
              </ListItem>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

PeopleSelect.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired})).isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.shape({
    Fullname: PropTypes.string.isRequired})).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
};

export default PeopleSelect;
