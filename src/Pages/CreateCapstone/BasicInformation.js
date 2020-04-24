import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {SelectValidator, TextValidator} from 'react-material-ui-form-validator';
import DeletableCardLayout from '../../Components/DeletableCardLayout';
import MarkdownEditor from '../../Components/Markdown/MarkdownEditor';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {imageURL} from '../../utils/utils';


const BasicInformation = (props) => {

  const [selectedDepartment, setSelectDepartment] = useState('');

  const renderInput = (p) => (
    <TextValidator
      validators={['required', 'isProfane'] }
      errorMessages={['this field is required', 'contains illegal word']}
      {...p}
    />
  );
  // TODO: add button to departments
  // <CardLayout
  //   title='All Departments'
  //   listItems={departments}
  //   childURL={routes.viewdepartment.genPath}
  //   imageURLFunction={imageURL.department}
  // />
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
                        value={props.name}
                        id='outlined-textarea'
                        label='Title'
                        placeholder='Type the title for the capstone project'
                        validators={['required', 'isProfane']}
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={props.handleChange('name')}
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
              <Grid container justify='center' spacing={2} direction='row'>
                <Grid item xs={7}>
                  <Tooltip title='Name of Course' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={props.course}
                        id='outlined-textarea'
                        label='Course Name'
                        placeholder='Type the name of the course'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={props.handleChange('course')}
                        variant='outlined'
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>

                <Grid item xs={5}>
                  <Tooltip title='Semester' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={props.semester}
                        id='outlined-textarea'
                        label='Semester'
                        placeholder='Type the semester'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={props.handleChange('semester')}
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
                        {props.departmentList.map(dept => (
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
                      props.handelConfirmDepartment(selectedDepartment);
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
                listItems={props.departments}
                imageURLFunction={imageURL.department}
                removeItem={props.handleRemoveDepartment}
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title='Preview For Search' arrow>
                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    value={props.preview}
                    id='outlined-textarea'
                    label='Preview'
                    rows='2'
                    multiline
                    placeholder='Type some preview'
                    onChange={props.handleChange('preview')}
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
                  setValue={(value) => props.handleDescription(value)}
                  value={props.description}
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
};

export default BasicInformation;
