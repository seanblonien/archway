import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {DesktopDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EventNoteIcon from '@material-ui/icons/EventNote';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PageTitleTypography from '../../Components/PageTitleTypography';


const styles = theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '300px',

  },
  card: {
    marginTop: '1%',
  },
  leftColCard: {
    marginRight: '2%',
    marginTop: '1%',
  },
  formMargin: {
    marginTop: '.5%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 250,
    placeholder: 'Search...'
  },
});

const BasicInformation = (props) => {

  /*
      classes
      handleTitle
      startDate
      endDate
      handleStartDate
      handleEndDate
      Department
      handleChangeDepartment
      departmentList
      handleDescription
  */

  const handleChangeSwitch = (event) => {
    console.log(event.target.name);
  };


  return (
    <Grid item xs={12} md={10}>
      <Card className={props.classes.card}>
        <CardContent>
          <PageTitleTypography text='Create Capstone' align='left' size='h4'/>
          <Grid container justify='left' spacing={3}>
            <Grid item xs={12}>
              {/* Form for capstone name */}
              <Grid container justify='left' spacing={3} direction='row'>
                <Grid item xs={9}>

                  <Tooltip title='Name of Capstone' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextField
                        id='outlined-textarea'
                        label='Title'
                        placeholder='Type the title for the capstone project'
                        multiline
                        onChange={props.handleTitle}
                        variant='outlined'
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.isFeatured}
                        name='is featured'
                        color='primary'
                        onChange={props.handleChangeSwitchFeature}
                      />
                    }
                    label='Featured'
                  />
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify='center' spacing={2} direction='row'>
                {/* Start & End Date */}
                <Tooltip title='Select A Date' arrow>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DesktopDatePicker
                        autoOk
                        variant='outlined'
                        label='Start Date'
                        placeholder='2018/01/01'
                        format='yyyy/MM/dd'
                        mask='____/__/__'
                        keyboardIcon={<EventNoteIcon/>}
                        value={props.startDate}
                        onChange={date => props.handleStartDate(date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Tooltip>
                <Tooltip title='Select A Date' arrow>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DesktopDatePicker
                        autoOk
                        variant='outlined'
                        label='End Date'
                        placeholder='2018/01/01'
                        format='yyyy/MM/dd'
                        mask='____/__/__'
                        keyboardIcon={<EventNoteIcon/>}
                        value={props.endDate}
                        onChange={date => props.handleEndDate(date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Tooltip>

              </Grid>
            </Grid>

            <Tooltip title='Select A Department' arrow>
              <Grid item xs={12}>
                {/* select department */}
                <FormControl margin='dense' fullWidth variant='filled'>
                  <InputLabel ref={null}>Department</InputLabel>
                  <Select
                    labelId='demo-customized-select-label'
                    id='demo-customized-select'
                    value={props.Department}
                    onChange={props.handleChangeDepartment}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {props.departmentList.map(dept => (
                      <MenuItem value={dept.name}>{dept.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Tooltip>

            <Tooltip title='Fill description' arrow>
              <Grid item xs={12}>
                <FormControl margin='dense' required fullWidth>
                  <TextField
                    id='outlined-textarea'
                    label='Description'
                    rows='4'
                    placeholder='Type the description'
                    multiline
                    variant='outlined'
                    onChange={props.handleDescription}
                  />
                </FormControl>
              </Grid>
            </Tooltip>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );

};

export default compose(
  withStyles(styles),
  withWidth(),
)(BasicInformation);