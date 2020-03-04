import DateFnsUtils from "@date-io/date-fns";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {DesktopDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import React, {useState} from "react";

function AdvancedKeyboardExample(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider  utils={DateFnsUtils} >
            <DesktopDatePicker
                autoOk
                variant="outlined"
                label= {props.label}
                placeholder="2018/01/01"
                format="yyyy/MM/dd"
                mask="____/__/__"
                keyboardIcon={<EventNoteIcon />}
                value={selectedDate}
                onChange={date => handleDateChange(date)}
            />
        </MuiPickersUtilsProvider>
    );
}

export default AdvancedKeyboardExample;
