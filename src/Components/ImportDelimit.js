import ListItem from '@material-ui/core/ListItem';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userImport} from '../constants';
import LoadingCircle from '../Components/LoadingCircle';
import UploadCSV from '../Components/UploadCSV';
import _ from 'lodash';
import {List, ListItemText, Box, Typography} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';

const FILE_STATE = {
    "nothing": 1,
    "notChecked": 2,
    "success": 3,
    "error": 4
};

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

        let stateToSet;
        if(!hasErrors && hasRequiredFields) {
            stateToSet = {fileState: FILE_STATE.success, fileData: fileData};
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
                            <Typography label="Required Fields Missing">Missing required fields:</Typography>
                            <List dense={true}>
                                {missingFields && missingFields.map(field =>
                                    <ListItem key={field}><ListItemText>{field}</ListItemText></ListItem>
                                )}
                            </List>
                        </Box>
                    }
                </div>;
            stateToSet = {fileState: FILE_STATE.error, fileData: fileData};
        }
        this.setState(stateToSet);
        this.props.setUsers(stateToSet.fileState === FILE_STATE.success, fileData.data);
    };

    onFileError = (error) => {
        console.error(error);
    };

    onFileClear = () => {
        let stateToSet = {fileState: FILE_STATE.nothing, fileData: undefined};
        this.props.setUsers(stateToSet.fileState === FILE_STATE.success, stateToSet.fileData);
        this.setState(stateToSet);
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
