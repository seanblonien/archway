import DateFnsUtils from '@date-io/date-fns';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {TextValidator} from 'react-material-ui-form-validator';
import Cards from '../../Components/Cards';
import MarkdownEditor from '../../Components/Markdown/MarkdownEditor';
import SubSectionTitle from '../../Components/Typography/SubsectionTitle';
import {imageURL} from '../../utils/utils';

const BasicInformation = ({classes, name, isFeatured, course, semester,
  startDate, endDate, departmentList, departments, preview, description,
  handleChange, handleStartDate, handleEndDate,
  setDepartments, setDescription}) => {
  const renderInput = (inputProps) => (
    <TextValidator
      validators={['required', 'isProfane'] }
      errorMessages={['this field is required', 'contains illegal word']}
      {...inputProps}
    />
  );

  const renderInputForDepartment = (inputProps) => (
    <TextValidator
      label='Search for a Department'
      validators={['haveDepartment'] }
      errorMessages={['Must select a department']}
      {...inputProps}
    />
  );

  const defaultPropsDepartments = {
    // options: AllUsers,
    options: _.differenceWith(departmentList, departments, _.isEqual),
    getOptionLabel: (option) => {
      if (option.name) {
        return option.name;
      }
      return '';
    }
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Form for capstone name */}
              <Grid container spacing={3} direction='row'>
                <Grid item xs={9}>
                  <Tooltip title='Name of Capstone' arrow>
                    <FormControl margin='dense' required fullWidth>
                      <TextValidator
                        value={name}
                        name='name'
                        label='Name'
                        placeholder='Type the title for the capstone project'
                        validators={['required', 'isProfane']}
                        errorMessages={['this field is required', 'contains illegal word']}
                        onChange={handleChange}
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
                        label='End Date'
                        format='yyyy/MM/dd'
                        mask='____/__/__'
                        keyboardIcon={<EventNoteIcon/>}
                        value = {endDate !== ''? new Date(endDate) : null}
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
              <Tooltip title='Select A Department' arrow>
                <Grid item xs={12}>
                  <FormControl margin='dense' fullWidth variant='filled'>
                    <Autocomplete
                      id='Search for a Department'
                      {...defaultPropsDepartments}
                      value={null}
                      onChange={(event, value) => {
                        setDepartments([...departments, value]);
                      }}
                      renderInput={renderInputForDepartment}
                    />
                  </FormControl>
                </Grid>
              </Tooltip>
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
                    validators={['required', 'isProfane'] }
                    errorMessages={['this field is required', 'contains illegal word']}
                  />
                </FormControl>
              </Tooltip>
            </Grid>
            <Tooltip title='Fill description' arrow>
              <Grid item xs={12}>
                <SubSectionTitle>Add a description</SubSectionTitle>
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
  startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    description: PropTypes.string,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  departmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
