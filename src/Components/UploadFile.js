import {Button, Typography} from '@material-ui/core';
import React, {Component} from 'react';
import _ from 'lodash';
import { CSVReader } from 'react-papaparse';

const FILE_STATE = Object.freeze({
    "nothing": 1,
    "notChecked": 2,
    "success": 3,
    "error": 4
});

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();

        this.state = {
            fileName: '',
            fileState: FILE_STATE.nothing
        }
    }

    componentDidMount() {
        console.dir(this.fileInput.current);
    }

    validateCSV = (data) => {
        if(data){
            this.setState({fileState: FILE_STATE.success});
        } else {
            this.setState({fileState: FILE_STATE.error});
        }
    };

    handleFileSelected = () => {
        this.setState({fileState: FILE_STATE.notChecked});
        console.log(this.state.fileState);
    };

    handleReadCSV = (data) => {
        console.log(data);
        let f = this.fileInput.current.files[0].name;
        console.log(this.fileInput);
        console.log(f);
        this.setState({fileName: f});
        this.validateCSV(data);
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    };

    render() {
        return (
            <div>
                <Typography label="File upload">{this.state.fileName}</Typography>
                <Button variant="contained" component="label">
                    Upload File
                    <CSVReader
                        onFileLoaded={this.handleReadCSV}
                        inputRef={this.fileInput}
                        style={{display: 'none'}}
                        onError={this.handleOnError}
                        configOptions={{header: true,
                            beforeFirstChunk: this.handleFileSelected}}
                    />
                </Button>
            </div>
        );
    }
}

export default UploadFile;
