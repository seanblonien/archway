import {Box, Button, TextField} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {CSVReader} from 'react-papaparse';

class UploadCSV extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
      fileName: ''
    };
  }

  handleOnClear = () => {
    const {onDataClear} = this.props;
    this.fileInput.current.value = '';
    this.setState({fileName: ''});
    onDataClear();
  };

  handleOnSelected = () => {
    this.setState({fileName: this.fileInput.current.files[0].name});
  };

  render() {
    const {fileName} = this.state;
    const {onDataError, onDataLoaded} = this.props;

    return (
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='flex-end'
        mb={3}
      >
        <TextField
          label='File Selected'
          InputProps={{readOnly: true}}
          value={fileName}
        />

        <Box mx={1}>
          <Button variant='contained' component='label'>
            Upload File
            <CSVReader
              onFileLoaded={onDataLoaded}
              inputRef={this.fileInput}
              style={{display: 'none'}}
              onError={onDataError}
              configOptions={{header: true,
                beforeFirstChunk: this.handleOnSelected}}
            />
          </Button>
        </Box>

        {!_.isEmpty(fileName) &&
          <Button variant='contained' onClick={this.handleOnClear}>
            <HighlightOff/>
          </Button>
        }
      </Box>
    );
  }
}

UploadCSV.propTypes = {
  onDataLoaded: PropTypes.func.isRequired,
  onDataError: PropTypes.func.isRequired,
  onDataClear: PropTypes.func.isRequired
};

export default UploadCSV;
