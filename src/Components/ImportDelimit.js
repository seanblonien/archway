import ListItem from '@material-ui/core/ListItem';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UploadText from '../Components/UploadText';
import {IMPORT_TYPE} from '../Pages/ImportUsers';
import {userImport} from '../constants';
import LoadingCircle from '../Components/LoadingCircle';
import UploadCSV from '../Components/UploadCSV';
import _ from 'lodash';
import {List, ListItemText, Box, Typography} from '@material-ui/core';
import {Check, Close} from '@material-ui/icons';

const IMPORT_STATE = {
    "nothing": 1,
    "notChecked": 2,
    "success": 3,
    "error": 4
};

class ImportDelimit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            importState: IMPORT_STATE.nothing,
            data: undefined
        };
    }

    onDataEntered = (file) => {
        this.setState({fileState: IMPORT_STATE.notChecked})
    };

    formatError = (error) => {
        return error.type + (_.has(error, 'row') ?  ' on row ' +
            error.row : '') + ': ' + error.message;
    };

    onDataLoaded = (parseResults) => {
        let hasErrors = !_.isEmpty(parseResults.errors);
        let missingFields = _.difference(userImport.requiredFields, parseResults.meta.fields);
        let hasRequiredFields = missingFields.length === 0;

        let stateToSet;
        if(!hasErrors && hasRequiredFields) {
            stateToSet = {fileState: IMPORT_STATE.success, fileData: parseResults};
        } else {
            this.errorComponent =
                <div>
                    <Close color="error" fontSize="large"/>
                    {hasErrors &&
                        <List>
                            {parseResults.errors.map(error=>
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
            stateToSet = {fileState: IMPORT_STATE.error, fileData: parseResults};
        }
        this.setState(stateToSet);
        this.props.setUsers(stateToSet.fileState === IMPORT_STATE.success, parseResults.data);
    };

    onDataError = (error) => {
        console.error(error);
    };

    onDataClear = () => {
        let stateToSet = {fileState: IMPORT_STATE.nothing, fileData: undefined};
        this.props.setUsers(stateToSet.fileState === IMPORT_STATE.success, stateToSet.fileData);
        this.setState(stateToSet);
    };

    renderChecked = (fileState) => {
        let render;

        switch(fileState){
            case IMPORT_STATE.nothing:
            default:
                render = <div></div>;
                break;
            case IMPORT_STATE.notChecked:
                render = <LoadingCircle/>;
                break;
            case IMPORT_STATE.success:
                render = <Check/>;
                break;
            case IMPORT_STATE.error:
                render = this.errorComponent;
                break;
        }

        return render;
    };

    renderType = (type) => {
        let render;

        switch(type) {
            case IMPORT_TYPE.file:
            default:
                render = <UploadCSV onDataEntered={this.onDataEntered}
                                    onDataLoaded={this.onDataLoaded}
                                    onDataError={this.onDataError}
                                    onDataClear={this.onDataClear}/>;
                break;
            case IMPORT_TYPE.text:
                render = <UploadText onDataLoaded={this.onDataLoaded}
                                    onDataClear={this.onDataClear}/>;
                break;
        }

        return render;
    };

    render() {
        return (
            <div display={'block'}>
                {this.renderType(this.props.type)}
                {this.renderChecked(this.state.fileState)}
            </div>
        );
    }
}

ImportDelimit.propTypes = {
    setUsers: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
};

export default ImportDelimit;
