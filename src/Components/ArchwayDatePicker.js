import DateFnsUtils from '@date-io/date-fns';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {DesktopDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const AdvancedKeyboardExample = ({label, handleStartDate}) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
      <DesktopDatePicker
        autoOk
        variant='outlined'
        label={label}
        placeholder='2018/01/01'
        format='yyyy/MM/dd'
        mask='____/__/__'
        keyboardIcon={<EventNoteIcon/>}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

AdvancedKeyboardExample.propTypes = {
  label: PropTypes.string.isRequired,
};

export default AdvancedKeyboardExample;
