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
        this.props.onFileSelected(this.fileInput.current.files[0]);
    };

    handleOnLoad = (data) => {
        this.props.onFileLoaded(data);
    };

    handleOnError = (err, file, inputElem, reason) => {
        this.props.onFileError(err, file, inputElem, reason);
    };

    handleOnClear = () => {
        console.dir(this.fileInput);
        console.log(this.fileInput.current.value);
        this.fileInput.current.value = '';
        this.setState({fileName: ''});
        this.props.onFileClear();
    };

    render() {
        return (
            <Box display='inline'>
                <TextField label='Upload File'
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
    onFileSelected: PropTypes.func.isRequired,
    onFileLoaded: PropTypes.func.isRequired,
    onFileError: PropTypes.func.isRequired,
    onFileClear: PropTypes.func.isRequired
};

export default UploadCSV;
