import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {TextFieldProps} from "@material-ui/core";



const BasicInformation = (props) => {

  const renderInput = (props: TextFieldProps): any => (
    <TextValidator
      validators={['required', 'isProfane'] }
      errorMessages={['this field is required', 'contains illegal word']}
      {...props}
    />
  );


  return (
    <Grid item xs={12} md={10}>
      <Card className={props.classes.card}>
        <CardContent>
          <PageTitleTypography text='Create Capstone' align='left' size='h4'/>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Form for capstone name */}
              <Grid container spacing={3} direction='row'>
                <Grid item xs={9}>
                  <Tooltip title='Name of Capstone' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={props.title}
                        id='outlined-textarea'
                        label='Title'
                        placeholder='Type the title for the capstone project'
                        validators={['required', 'isProfane']}
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={props.handleChange('title')}
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
                        onChange={props.handleChangeSwitch('isFeatured')}
                      />
                    }
                    label='Featured'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title='Name of Course' arrow>
                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    value={props.courseName}
                    id='outlined-textarea'
                    label='Course Name'
                    placeholder='Type the name of the course'
                    validators={['required', 'isProfane'] }
                    errorMessages={['this field is required', 'contains illegal word']}
                    onChange={props.handleChange('courseName')}
                    variant='outlined'
                  />
                </FormControl>
              </Tooltip>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify='center' spacing={2} direction='row'>
                {/* Start & End Date */}
                <Tooltip title='Select A Date' arrow>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant='outlined'
                        label='Start Date'
                        placeholder='2018/01/01'
                        format='yyyy/MM/dd'
                        mask='____/__/__'
                        keyboardIcon={<EventNoteIcon/>}
                        value={props.startDate}
                        onChange={props.handleStartDate}
                        TextFieldComponent={renderInput}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Tooltip>
                <Tooltip title='Select A Date' arrow>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant='outlined'
                        label='End Date'
                        format='yyyy/MM/dd'
                        mask='____/__/__'
                        keyboardIcon={<EventNoteIcon/>}
                        value={props.endDate}
                        onChange={props.handleEndDate}
                        TextFieldComponent={renderInput}
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
                  <SelectValidator
                    label='Select a department'
                    id='demo-customized-select'
                    variant='outlined'
                    value={props.Department}
                    onChange={props.handleChange('Department')}
                    validators={['required'] }
                    errorMessages={['this field is required']}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {props.departmentList.map(dept => (
                      <MenuItem
                        key={dept.id}
                        value={dept}>{dept.name}</MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Tooltip>
            <Grid item xs={12}>
              <Tooltip title='Preview For Search' arrow>
                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    value={props.preview}
                    id='outlined-textarea'
                    label='Preview'
                    rows='2'
                    multiline
                    placeholder='Type some preivew'
                    onChange={props.handleChange('preview')}
                    variant='outlined'
                    validators={['required', 'isProfane'] }
                    errorMessages={['this field is required', 'contains illegal word']}
                  />
                </FormControl>
              </Tooltip>
            </Grid>
              <Grid item xs={12}>
                <Tooltip title='Fill description' arrow>

                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    id='outlined-textarea'
                    label='Description'
                    rows='4'
                    placeholder='Type the description'
                    multiline
                    variant='outlined'
                    value={props.description}
                    onChange={props.handleChange('description')}
                    validators={['required', 'isProfane'] }
                    errorMessages={['this field is required', 'contains illegal word']}
                  />
                </FormControl>
                </Tooltip>

              </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

BasicInformation.propTypes = {
  title: PropTypes.string.isRequired,

};

export default BasicInformation;