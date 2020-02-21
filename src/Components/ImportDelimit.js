import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userImport} from '../constants';
import LoadingCircle from '../Components/LoadingCircle';
import UploadCSV from '../Components/UploadCSV';
import _ from 'lodash';
import {List, ListItemText, Box} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';

const FILE_STATE = Object.freeze({
    "nothing": 1,
    "notChecked": 2,
    "success": 3,
    "error": 4
});

class ImportDelimit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileState: FILE_STATE.nothing,
            fileData: undefined
        };
    }

    onFileSelected = (file) => {
        this.setState({fileState: FILE_STATE.notChecked})
    };

    formatError = (error) => {
        return error.type + (_.has(error, 'row') ?  ' on row ' +
            error.row : '') + ': ' + error.message;
    };

    onFileLoaded = (fileData) => {
        let hasErrors = !_.isEmpty(fileData.errors);
        let missingFields = _.difference(userImport.requiredFields, fileData.meta.fields);
        let hasRequiredFields = missingFields.length === 0;

        if(!hasErrors && hasRequiredFields) {
            this.setState({fileState: FILE_STATE.success, fileData: fileData});
        } else {
            this.errorComponent =
                <div>
                    <Close color="error" fontSize="large"/>
                    {hasErrors &&
                        <List>
                            {fileData.errors.map(error=>
                                <ListItemText>
                                    {this.formatError(error)}
                                </ListItemText>
                            )}
                        </List>
                    }
                    {!hasRequiredFields &&
                        <Box>
                            Missing required fields: {missingFields.join(', ')}
                        </Box>
                    }
                </div>;
            this.setState({fileState: FILE_STATE.error, fileData: fileData});
        }
        this.props.setUsers(this.state.fileState === FILE_STATE.success, fileData.data);
    };

    onFileError = (error) => {
        console.error(error);
    };

    onFileClear = () => {
        this.setState({fileState: FILE_STATE.nothing, fileData: undefined});
        this.props.setUsers(this.state.fileState === FILE_STATE.success, undefined);
    };

    renderChecked = (fileState) => {
        let render;

        switch(fileState){
            case FILE_STATE.nothing:
            default:
                render = <div></div>;
                break;
            case FILE_STATE.notChecked:
                render = <LoadingCircle/>;
                break;
            case FILE_STATE.success:
                render = <Check/>;
                break;
            case FILE_STATE.error:
                render = this.errorComponent;
                break;
        }

        return render;
    };

    render() {
        return (
            <div display={'block'}>
                <UploadCSV onFileSelected={this.onFileSelected}
                           onFileLoaded={this.onFileLoaded}
                           onFileError={this.onFileError}
                           onFileClear={this.onFileClear}/>

                {this.renderChecked(this.state.fileState)}
            </div>
        );
    }
}

ImportDelimit.propTypes = {
    setUsers: PropTypes.func.isRequired,
};

export default ImportDelimit;
