import {Box, TextField} from '@material-ui/core';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {readString} from 'react-papaparse';

class UploadText extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        if(_.isEmpty(event.target.value)) {
            this.props.onDataClear();
        } else {
            let parseResults = readString(event.target.value, {header: true});
            this.props.onDataLoaded(parseResults);
        }
    };

    render() {
        return (
            <Box display='inline'>
                <TextField
                    id="standard-multiline-static"
                    label="Paste text here"
                    multiline
                    rows="10"
                    fullWidth
                    onChange={this.handleChange}
                />
            </Box>
        );
    }
}

UploadText.propTypes = {
    onDataLoaded: PropTypes.func.isRequired,
    onDataClear: PropTypes.func.isRequired
};

export default UploadText;
