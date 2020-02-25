import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FieldList from '../Components/FieldList';
import UploadText from '../Components/UploadText';
import {IMPORT_TYPE} from '../Pages/ImportUsers';
import {strapi, strapiURL, userImport} from '../constants';
import LoadingCircle from '../Components/LoadingCircle';
import UploadCSV from '../Components/UploadCSV';
import _ from 'lodash';
import {
    List,
    ListItemText,
    Box,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import {Check, Close, GetApp, GetAppRounded} from '@material-ui/icons';

const IMPORT_STATE = {
    "none": 1,
    "success": 2,
    "error": 3
};

const PARSE_STATE = {
    "none": 0,
    "success": 1,
    "error": 2
};

class ImportDelimit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            importState: IMPORT_STATE.none,
            parseState: PARSE_STATE.none,
            data: undefined,
            roles: [],
            parseErrors: [],
            importErrors: []
        };
    }

    async componentDidMount() {
        let roles = await strapi.axios.get(strapiURL + '/users-permissions/roles');
        this.setState({roles: roles.data.roles});
    }

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
            stateToSet = {
                parseState: PARSE_STATE.success,
                data: parseResults.data
            };
        } else {
            this.errorComponent =
                <div>
                    <Close color="error" fontSize="large"/>
                    {hasErrors &&
                        <FieldList fields={parseResults.errors.map(error=>this.formatError(error))} label="Import Errors"/>
                    }
                    {!hasRequiredFields &&
                        <FieldList fields={missingFields} label="Missing required fields:"/>
                    }
                </div>;
            stateToSet = {
                parseState: PARSE_STATE.error,
                data: parseResults.data,
                parseErrors: parseResults.errors
            };
        }
        stateToSet = {...stateToSet, importState: IMPORT_STATE.none, importErrors: []};
        this.setState(stateToSet);
    };

    onDataError = (error) => {
        console.error(error);
    };

    onDataClear = () => {
        this.setState({parseState: PARSE_STATE.none, data: undefined, parseErrors: []});
    };

    renderParseState = (parseState) => {
        let render;

        switch(parseState){
            case PARSE_STATE.none:
            default:
                render = <div></div>;
                break;
            case PARSE_STATE.success:
                render = <Check/>;
                break;
            case PARSE_STATE.error:
                render = this.errorComponent;
                break;
        }

        return render;
    };

    renderUploadType = (type) => {
        let render;

        switch(type) {
            case IMPORT_TYPE.file:
            default:
                render = <UploadCSV onDataLoaded={this.onDataLoaded}
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

    importFile = async (e) => {
        //e.preventDefault();
        const {data, roles, importErrors} = this.state;

        let users = data.map(user => {
            // validate role
            user.role = roles.filter(role => role.name === user.role).map(role => role.id)[0];
            let p = [...Array(6)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
            if (!user.hasOwnProperty('password')) user['password'] = p;
            return user;
        });

        const stateToSet = {};
        for (const user of users) {
            try {
                await strapi.axios.post(strapiURL + '/content-manager/explorer/plugins::users-permissions.user', user);
            } catch (err) {
                console.error(err);
                let msg = err.response.data.message[0].messages[0];
                let errMsg = JSON.stringify(user) + ': ' + msg.id + ': ' + msg.message;
                stateToSet.importErrors = [...importErrors, errMsg];
            }
        }
        stateToSet.importState = _.isEmpty(stateToSet.importErrors) ? IMPORT_STATE.success : IMPORT_STATE.error;

        this.setState(stateToSet);
    };

    render() {
        const {roles, importState, parseState, importErrors} = this.state;
        const {type} = this.props;

        return (
            <div>
                {importState === IMPORT_STATE.success ?
                    <div>
                        <Typography variant="h5" style={{marginTop: '16px'}}>Import Successful ✅</Typography>
                        {/*//TODO: Redirect to dashboard*/}
                    </div>
                    :
                    <div>
                        {this.renderUploadType(type)}
                        {this.renderParseState(parseState)}

                        <Box>

                            <Typography>
                                <Link to={require('../Images/exampleImport.csv')} target="_blank" download>
                                    Download
                                </Link> example import file
                            </Typography>
                            <br/>
                            <FieldList fields={userImport.requiredFields} label="Required fields are:"/>
                            <FieldList fields={userImport.optionalFields} label="Optional fields are:"/>
                            <FieldList fields={roles.map(role => role.name)} label="Valid roles are:"/>

                            <br/>
                            <Button onClick={this.importFile}
                                    variant="contained"
                                    disabled={!(parseState === PARSE_STATE.success && importState !== IMPORT_STATE.error)}>Import</Button>

                            {!_.isEmpty(importErrors) &&
                                <FieldList fields={importErrors} label="Import Errors:"/>
                            }
                        </Box>
                    </div>
                }
            </div>
        );
    }
}

ImportDelimit.propTypes = {
    setUsers: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
};

export default ImportDelimit;
