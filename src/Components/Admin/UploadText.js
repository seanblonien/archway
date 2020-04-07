import {Box, TextField} from '@material-ui/core';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {readString} from 'react-papaparse';

class UploadText extends Component {
    handleChange = (event) => {
      const {onDataClear, onDataLoaded} = this.props;

      if(_.isEmpty(event.target.value)) {
        onDataClear();
      } else {
        const parseResults = readString(event.target.value, {header: true});
        onDataLoaded(parseResults);
      }
    };

    render() {
      return (
        <Box my={3}>
          <TextField
            id='standard-multiline-static'
            label='Paste text here'
            multiline
            rows='10'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            placeholder='email,role,Fullname,username
joe@google.com,Student,Joe Smith,joesmith1'
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
