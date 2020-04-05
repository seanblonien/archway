import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PageTitleTypography from "../../Components/PageTitleTypography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SimpleDialog from "../../Components/AddUserDialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListItemText from "@material-ui/core/ListItemText";


const MemberInformation = ( props ) => {

  /*
  * classes
  * AllUsers
  * props
  * handleConfirmTeammate
  * handleClickDialogOpen
  * handleNewUser
  * dialogOpen
  * handleClickDialogClose
  * Participants
  * handleSelectedProfessor
  * handleSelectedTA
  */

  const [selectUser, setSelectUser] = useState('');

  const handleSelectUser = (event, values) => {
    setSelectUser(values);
  };


  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={10}>
        <Card className={props.classes.card}>
          <CardContent>
            <Grid container  justify='left' alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <Grid container  justify='center' alignItems='center'>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' justify='left' spacing={3} direction='row'>
                      <Grid item xs={8}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={props.AllUsers}
                          getOptionLabel={(option) => option.Fullname}
                          style={{ width: 300 }}
                          onChange={handleSelectUser}
                          renderInput={(params) => <TextField {...params} label="Search for Team Members" variant="outlined" />}
                        />
                      </Grid>
                      <Grid item>

                        <Button variant='outlined' color='primary' onClick={() => props.handleConfirmTeammate(selectUser)}>
                          Confirm
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant='outlined' color='primary' onClick={props.handleClickDialogOpen}>
                          Add a new user
                        </Button>
                        {/* <AddUser/> */}
                        <SimpleDialog selectedValue={props.handleNewUser} open={props.dialogOpen} onClose={props.handleClickDialogClose}/>
                      </Grid>
                    </Grid>

                  </Grid>
                  {/* team list */}
                  <Grid item xs={9}>
                    {props.Participants.map(participant =>(<ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EmojiPeopleIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.Fullname}
                      />
                    </ListItem>))

                    }
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
            <Grid container  justify='left' alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <PageTitleTypography text='Team Member Information' align='left' size='h5'/>
                <Divider/>
              </Grid>

              <Grid item xs={12}>
                <Grid container  justify='center' alignItems='center' spacing={2}>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' justify='space-evenly' spacing={3} direction='row'>
                      <Grid item xs={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={props.AllUsers}
                          getOptionLabel={(option) => option.Fullname}
                          style={{ width: 300 }}
                          onChange={props.handleSelectedProfessor}
                          renderInput={(params) => <TextField {...params} label="Search for Professor" variant="outlined" />}
                        />
                      </Grid>

                      <Grid item>

                        <Button variant='outlined' color='primary' onClick={props.handleConfirmTeammate}>
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container alignItems='center' justify='space-evenly' spacing={3} direction='row'>
                      <Grid item xs={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={props.AllUsers}
                          getOptionLabel={(option) => option.Fullname}
                          style={{ width: 300 }}
                          onChange={props.handleSelectedTA}
                          renderInput={(params) => <TextField {...params} label="Search for TA" variant="outlined" />}
                        />
                      </Grid>
                      <Grid item>

                        <Button variant='outlined' color='primary' onClick={props.handleConfirmTeammate}>
                          Confirm
                        </Button>
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