import {Box, Button, Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {Check, Close} from '@material-ui/icons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {transformUserFields} from '../utils/utils';
import {USER_IMPORT_TYPE, strapi, strapiURL, userImport} from '../constants';
import FieldList from './FieldList';
import UploadCSV from './UploadCSV';
import UploadText from './UploadText';
import exampleImport from '../Static/exampleImport.csv';

const IMPORT_STATE = {
  'none': 1,
  'success': 2,
  'error': 3
};

const PARSE_STATE = {
  'none': 0,
  'success': 1,
  'error': 2
};

class ImportDelimit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      importState: IMPORT_STATE.none,
      parseState: PARSE_STATE.none,
      data: undefined,
      roles: [],
      importErrors: []
    };
  }

  // Fetches the valid roles available in Strapi
  async componentDidMount() {
    const roles = await strapi.axios.get(`${strapiURL}/users-permissions/roles`);
    this.setState({roles: roles.data.roles});
  }

  onDataClear = () => {
    this.setState({parseState: PARSE_STATE.none, data: undefined});
  };

  // Called when data is loaded from input. Error state is set if parse
  // errors.
  onDataLoaded = (parseResults) => {
    const hasErrors = !_.isEmpty(parseResults.errors.filter(e => e.message.match('Too few fields*parsed 1')));
    const missingFields = _.difference(userImport.fields.filter(field => field.required).map(field => field.name), parseResults.meta.fields);
    const hasRequiredFields = missingFields.length === 0;
    parseResults.data = parseResults.data.filter(data => {
      const [firstKey] = parseResults.meta.fields;
      return Object.entries(data).length > 1 && !_.isEmpty(data[firstKey]);
    });

    let stateToSet;
    if(!hasErrors && hasRequiredFields) {
      stateToSet = {
        parseState: PARSE_STATE.success,
        data: parseResults.data
      };
    } else {
      this.errorComponent =
        <div>
          <Close color='error' fontSize='large'/>
          {hasErrors &&
            <FieldList fields={parseResults.errors.map(error=>this.formatError(error))} label='Import Errors'/>
          }
          {!hasRequiredFields &&
            <FieldList fields={missingFields} label='Missing required fields:'/>
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

  // Formats CSV parsing errors
  formatError = (error) => `${error.type + (_.has(error, 'row') ?  ` on row ${ 
    error.row}` : '')}: ${error.message}`;

  // Tries to import the data into Strapi
  // Populates the import errors if importing does not succeed
  importFile = async () => {
    const {data, importErrors} = this.state;

    const userPromises = data.map(user => transformUserFields(user));
    await Promise.all(userPromises);

    const stateToSet = {};
    const promises = data.map(user =>
      strapi.axios.post(`${strapiURL}/content-manager/explorer/plugins::users-permissions.user`, user));

    await Promise.all(promises).catch(err => {
      const msg = err.response.data.message[0].messages[0];
      const errMsg = `${err.config.data}: ${msg.id}: ${msg.message}`;
      stateToSet.importErrors = [...importErrors, errMsg];
    });
    stateToSet.importState = _.isEmpty(stateToSet.importErrors) ? IMPORT_STATE.success : IMPORT_STATE.error;

    this.setState(stateToSet);
  };

  // Renders the parse state (nothing, successfully parsed, parse errors)
  renderParseState = (parseState) => {
    let render;

    switch(parseState) {
      case PARSE_STATE.none:
      default:
        render = null;
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

  // Renders the import type (file, text box)
  renderImportType = (type) => {
    let render;

    switch(type) {
      case USER_IMPORT_TYPE.file:
      default:
        render =
          <UploadCSV
            onDataLoaded={this.onDataLoaded}
            onDataError={console.error}
            onDataClear={this.onDataClear}
          />;
        break;
      case USER_IMPORT_TYPE.text:
        render =
          <UploadText
            onDataLoaded={this.onDataLoaded}
            onDataClear={this.onDataClear}
          />;
        break;
    }

    return render;
  };

  render() {
    const {roles, importState, parseState, importErrors} = this.state;
    const {type} = this.props;

    return (
      <div>
        {importState === IMPORT_STATE.success ?
          <div>
            <Typography variant='h5' style={{marginTop: '16px'}}>
              Import Successful <Check/>
            </Typography>
            {/* //TODO: Redirect to dashboard */}
          </div>
          :
          <div>
            {this.renderImportType(type)}
            {this.renderParseState(parseState)}

            <Box>
              <Typography>
                <Link to={exampleImport} download target='_self'>
                  Download
                </Link> example import file
              </Typography>
              <br/>
              <FieldList
                fields={userImport.fields
                  .filter(field => field.required)
                  .map(field => field.label)} label='Required fields are:'
              />
              <FieldList
                fields={userImport.fields
                  .filter(field => !field.required)
                  .map(field => field.label)} label='Optional fields are:'
              />
              <FieldList fields={roles.map(role => role.name)} label='Valid roles are:'/>

              <br/>
              <Button
                onClick={this.importFile}
                variant='contained'
                disabled={!(parseState === PARSE_STATE.success && importState !== IMPORT_STATE.error)}
              >
                Import
              </Button>

              {!_.isEmpty(importErrors) &&
                <FieldList fields={importErrors} label='Import Errors:'/>
              }
            </Box>
          </div>
        }
      </div>
    );
  }
}

ImportDelimit.propTypes = {
  type: PropTypes.number.isRequired,
};

export default ImportDelimit;
