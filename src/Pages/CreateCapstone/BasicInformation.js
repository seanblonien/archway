import React, {useState} from 'react';
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
import {TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {TextFieldProps} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MarkdownEditor from '../../Components/Markdown/MarkdownEditor';
import PageTitleTypography from '../../Components/PageTitleTypography';
import DeletableCardLayout from '../../Components/DeletableCardLayout';
import {imageURL} from '../../utils/utils';


const BasicInformation = (props) => {

  const [selectedDepartment, setSelectDepartment] = useState('');

  const {classes, name, isFeatured, course, semester,
    startDate, endDate, departmentList, departments, preview, description,
    handleChange, handleChangeSwitch, handleStartDate, handleEndDate,
    handleConfirmDepartment, handleRemoveDepartment, handleDescription} = props;
  const renderInput = (inputProps: TextFieldProps): any => (
    <TextValidator
      validators={['required', 'isProfane'] }
      errorMessages={['this field is required', 'contains illegal word']}
      {...inputProps}
    />
  );
  return (
    <Grid item xs={12} md={10}>
      <Card className={classes.card}>
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
                        value={name}
                        id='outlined-textarea'
                        label='Title'
                        placeholder='Type the title for the capstone project'
                        validators={['required', 'isProfane']}
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange('name')}
                        variant='outlined'
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>

                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isFeatured}
                        name='is featured'
                        color='primary'
                        onChange={handleChangeSwitch('isFeatured')}
                      />
                    }
                    label='Featured'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2} direction='row'>
                <Grid item xs={7}>
                  <Tooltip title='Name of Course' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={course}
                        id='outlined-textarea'
                        label='Course Name'
                        placeholder='Type the name of the course'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange('course')}
                        variant='outlined'
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>

                <Grid item xs={5}>
                  <Tooltip title='Semester' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={semester}
                        id='outlined-textarea'
                        label='Semester'
                        placeholder='Type the semester'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange('semester')}
                        variant='outlined'
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>
              </Grid>

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
                        value={startDate}
                        onChange={handleStartDate}
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
                        value={endDate}
                        onChange={handleEndDate}
                        TextFieldComponent={renderInput}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Tooltip>

              </Grid>
            </Grid>

            <Grid item xs={12}>
              {/* select department */}
              <Grid container alignItems='center' spacing={5} direction='row'>
                <Tooltip title='Select A Department' arrow>

                  <Grid item xs={8}>
                    <FormControl margin='dense' fullWidth variant='filled'>
                      <SelectValidator
                        label='Select a department'
                        id='demo-customized-select'
                        variant='outlined'
                        value={selectedDepartment}
                        onChange={event => {
                          setSelectDepartment(event.target.value);
                        }}
                        validators={['haveDepartment'] }
                        errorMessages={['this field is required']}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {departmentList.map(dept => (
                          <MenuItem
                            key={dept.id}
                            value={dept}
                          >{dept.name}</MenuItem>
                        ))}
                      </SelectValidator>
                    </FormControl>
                  </Grid>
                </Tooltip>

                <Grid item xs={2}>
                  <Button
                    variant='outlined' color='primary' onClick={() => {
                      handleConfirmDepartment(selectedDepartment);
                      setSelectDepartment('');
                    }}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DeletableCardLayout
                listItems={departments}
                imageURLFunction={imageURL.department}
                removeItem={handleRemoveDepartment}
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title='Preview For Search' arrow>
                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    value={preview}
                    id='outlined-textarea'
                    label='Preview'
                    rows='2'
                    multiline
                    placeholder='Type some preview'
                    onChange={handleChange('preview')}
                    variant='outlined'
                    validators={['required', 'isProfane'] }
                    errorMessages={['this field is required', 'contains illegal word']}
                  />
                </FormControl>
              </Tooltip>
            </Grid>
            <Tooltip title='Fill description' arrow>

              <Grid item xs={12}>
                <PageTitleTypography text='Add a description' align='left' size='h6'/>
                <MarkdownEditor
                  uniqueName='description'
                  setValue={(value) => handleDescription(value)}
                  value={description}
                />
              </Grid>
            </Tooltip>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

BasicInformation.propTypes = {
  name: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  course: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  // TODO: ask if is correct
  departmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  preview: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeSwitch: PropTypes.func.isRequired,
  handleStartDate: PropTypes.func.isRequired,
  handleEndDate: PropTypes.func.isRequired,
  handleConfirmDepartment: PropTypes.func.isRequired,
  handleRemoveDepartment: PropTypes.func.isRequired,
  handleDescription: PropTypes.func.isRequired
};

export default BasicInformation;