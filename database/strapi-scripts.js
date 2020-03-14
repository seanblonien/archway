/**
 * This file contains Strapi constants and helper methods for running Strapi
 * related scripts.
 */
/* eslint-disable no-console, no-await-in-loop, no-empty */
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');

const STRAPI_BASE_URL = 'http://localhost:1337';
const STRAPI_CONTENT_TYPE_URL = `${STRAPI_BASE_URL}/content-type-builder/content-types`;
const STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL = `${STRAPI_CONTENT_TYPE_URL}/application::`;
const STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL = `${STRAPI_CONTENT_TYPE_URL}/plugins::`;
const STRAPI_CONTENT_TYPE_GET_URL = `${STRAPI_BASE_URL}/content-manager/content-types/application::`;
const STRAPI_ADMIN_REGISTER = `${STRAPI_BASE_URL}/admin/auth/local/register`;
const STRAPI_ADMIN_LOGIN = `${STRAPI_BASE_URL}/admin/auth/local`;
const STRAPI_ADMIN_USERNAME = 'admin';
const STRAPI_ADMIN_PASSWORD = 'capstone';
const STRAPI_ADMIN_EMAIL = 'seanb2016@gmail.com';

// Authenticates with the Strapi server and sets authorization token in the
// request headers
const authenticate = async () => {
  let loginResponse;

  try {
    // Attempt to register
    loginResponse = await axios.post(STRAPI_ADMIN_REGISTER, {
      'username': STRAPI_ADMIN_USERNAME,
      'email': STRAPI_ADMIN_EMAIL,
      'password': STRAPI_ADMIN_PASSWORD,
      'passwordConfirmation': STRAPI_ADMIN_PASSWORD
    });
  } catch (error) {
    // If already registered
    if (error.response.status !== 200) {
      // Attempt to login
      try {
        loginResponse = await axios.post(STRAPI_ADMIN_LOGIN, {
          'identifier': STRAPI_ADMIN_USERNAME,
          'password': STRAPI_ADMIN_PASSWORD,
          'rememberMe': false
        });
      } catch (error2) {
        console.error(`Error when logging in:\n ${error2}`);
        return;
      }
    }
  }

  // Set the authorization token in the header after successful login
  axios.defaults.headers.common.Authorization = `Bearer ${loginResponse.data.jwt}`;
};

// Format the content type object with the Strapi format required for
// creating and updating a content type
const formatContentType = contentType => {
  return {
    'components': [],
    'contentType': contentType
  };
};

// Waits until the Strapi endpoint is reachable while restarting
const awaitRestart = async () => {
  let response = null;
  while (response == null) {
    try {
      response = await axios.get(STRAPI_BASE_URL);
    } catch (error) {
    }
  }
  return true;
};

// Reads in the given file assumed to be in the local directory
const readJSONFromFile = filename => {
  return fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
};

// Writes the given json object to the filename provided in the current
// directory
const writeJSONToFile = (filename, jsonObj) => {
  fs.writeFileSync(`${path.resolve(__dirname, filename)}`,
    JSON.stringify(jsonObj, null, 2),
    'utf8');
};

const removePluginAttribute = contentTypes => {
  contentTypes.forEach(contentType => {
    Object.keys(contentType.attributes).forEach(t => {
      if(contentType.attributes[t].plugin){
        delete contentType.attributes[t].plugin;
      }
    });
  });
};

module.exports = {
  axios,
  authenticate,
  formatContentType,
  awaitRestart,
  readJSONFromFile,
  writeJSONToFile,
  removePluginAttribute,
  STRAPI_BASE_URL,
  STRAPI_CONTENT_TYPE_URL,
  STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL,
  STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL,
  STRAPI_CONTENT_TYPE_GET_URL
};
