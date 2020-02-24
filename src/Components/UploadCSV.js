import {Button, Box, TextField} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';
import React, {Component} from 'react';
import { CSVReader } from 'react-papaparse';
import PropTypes from 'prop-types';
import _ from 'lodash';

class UploadCSV extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();

        this.state = {
            fileName: ''
        }
    }

    handleOnSelected = () => {
        this.setState({fileName: this.fileInput.current.files[0].name});
        this.props.onDataEntered(this.fileInput.current.files[0]);
    };

    handleOnLoad = (parseResults) => {
        this.props.onDataLoaded(parseResults);
    };

    handleOnError = (err, file, inputElem, reason) => {
        this.props.onDataError(err, file, inputElem, reason);
    };

    handleOnClear = () => {
        this.fileInput.current.value = '';
        this.setState({fileName: ''});
        this.props.onDataClear();
    };

    render() {
        return (
            <Box display='inline'>
                <TextField label='File Selected'
                           InputProps={{readOnly: true}}
                           value={this.state.fileName}/>

                <Button variant="contained" component="label">
                    Upload File
                    <CSVReader
                        onFileLoaded={this.handleOnLoad}
                        inputRef={this.fileInput}
                        style={{display: 'none'}}
                        onError={this.handleOnError}
                        configOptions={{header: true,
                            beforeFirstChunk: this.handleOnSelected}}
                    />
                </Button>

                {!_.isEmpty(this.state.fileName) &&
                    <Button variant="contained" onClick={this.handleOnClear}>
                        <HighlightOff/>
                    </Button>
                }
            </Box>
        );
    }
}

UploadCSV.propTypes = {
    onDataEntered: PropTypes.func.isRequired,
    onDataLoaded: PropTypes.func.isRequired,
    onDataError: PropTypes.func.isRequired,
    onDataClear: PropTypes.func.isRequired
};

export default UploadCSV;
