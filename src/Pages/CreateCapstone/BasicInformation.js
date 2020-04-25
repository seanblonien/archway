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
import Cards from '../../Components/Cards';
import MarkdownEditor from '../../Components/Markdown/MarkdownEditor';
import PageTitleTypography from '../../Components/PageTitleTypography';
import {imageURL} from '../../utils/utils';


const BasicInformation = ({classes, name, isFeatured, course, semester,
  startDate, endDate, departmentList, departments, preview, description,
  handleChange, handleStartDate, handleEndDate,
  setDepartments, setDescription}) => {
  const [selectedDepartment, setSelectDepartment] = useState('none');
  const renderInput = (inputProps) => (
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
                        label='Title'
                        placeholder='Type the title for the capstone project'
                        validators={['required', 'isProfane']}
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange}
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
                        name='isFeatured'
                        color='primary'
                        onChange={handleChange}
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
                        name='course'
                        label='Course Name'
                        placeholder='Type the name of the course'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange}
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
                        name='semester'
                        label='Semester'
                        placeholder='Type the semester'
                        validators={['required', 'isProfane'] }
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange}
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
                        variant='outlined'
                        value={selectedDepartment}
                        onChange={event => {
                          setSelectDepartment(event.target.value);
                        }}
                        validators={['haveDepartment'] }
                        errorMessages={['this field is required']}
                      >
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
                      setDepartments([...departments, selectedDepartment]);
                      setSelectDepartment('');
                    }}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Cards
                listItems={departments}
                imageURLFunction={imageURL.department}
                setListItems={setDepartments}
                canRoute={false}
                canDelete
                previewWords={10}
                mediaHeight={100}
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title='Preview For Search' arrow>
                <FormControl margin='dense' required fullWidth>
                  <TextValidator
                    value={preview}
                    label='Preview'
                    name='preview'
                    rows='2'
                    multiline
                    placeholder='Type some preview'
                    onChange={handleChange}
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
                  setValue={setDescription}
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
  handleStartDate: PropTypes.func.isRequired,
  handleEndDate: PropTypes.func.isRequired,
  setDepartments: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired
};

export default BasicInformation;
