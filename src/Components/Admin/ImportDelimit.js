import {Box, Button, Typography, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Check, Close} from '@material-ui/icons';
import _ from 'lodash';
import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {compose} from 'recompose';
import api from '../../Services/api';
import exampleImport from '../../Static/exampleImport.csv';
import {snackbarPropTypes} from '../../utils/PropTypesConfig';
import history from '../../utils/Routing/history';
import routes from '../../utils/Routing/routes';
import {snack} from '../../utils/Snackbar';
import {transformUserFields} from '../../utils/utils';
import {linkStyles} from '../Typography/StyledLink';
import {userImportFields} from './AddUser';
import FieldList from './FieldList';
import UploadCSV from './UploadCSV';
import UploadText from './UploadText';

export const USER_IMPORT_TYPE = {
  'none': 0,
  'file': 1,
  'text': 2,
  'manual': 3
};

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
    const roles = await api.getRoles();
    this.setState({roles: roles.data.roles});
  }

  onDataClear = () => {
    this.setState({parseState: PARSE_STATE.none, data: undefined});
  };

  // Called when data is loaded from input. Error state is set if parse
  // errors.
  onDataLoaded = (parseResults) => {
    const hasErrors = !_.isEmpty(parseResults.errors.filter(e => e.message.match('Too few fields*parsed 1')));
    const missingFields = _.difference(userImportFields.filter(field => field.required).map(field => field.name), parseResults.meta.fields);
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
    const promises = data.map(user => api.users.create(user));

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
    const {type, classes, enqueueSnackbar} = this.props;

    if(importState === IMPORT_STATE.success){
      enqueueSnackbar('Import Successful!', snack.success);
      history.push(routes.dashboard.path);
    }

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
                <a className={classes.link} href={exampleImport} download target='_self'>
                  Download
                </a> example import file
              </Typography>
              <br/>
              <Grid container>
                <Grid item xs>
                  <FieldList
                    fields={userImportFields
                      .filter(field => field.required)
                      .map(field => field.label)} label='Required fields are:'
                  />
                </Grid>
                <Grid item xs>
                  <FieldList
                    fields={userImportFields
                      .filter(field => !field.required)
                      .map(field => field.label)} label='Optional fields are:'
                  />
                </Grid>
                <Grid item xs>
                  <FieldList fields={roles.map(role => role.name)} label='Valid roles are:'/>
                </Grid>
              </Grid>

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
  ...snackbarPropTypes
};

export default compose(
  withSnackbar,
  withStyles(linkStyles)
)(ImportDelimit);
