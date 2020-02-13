/**
 * Script that imports a Strapi content type schema from a local JSON file
 * that stores both the application (user created) and plugin (strapi
 * created) content types.
 *
 * This program merely creates and imports any new content types into
 * Strapi, and for the content types that already exist, they will be
 * updated if they differ from their imported counterpart.
 *
 * The URL routing, JSON format, and specific syntax all comes from reverse
 * engineering the content-type-builder within Strapi. The documentation may
 * be helpful, although it was outdated for this:
 * https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#concept
 */
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const STRAPI_BASE_URL = 'http://localhost:1337';
const STRAPI_CONTENT_TYPE_URL = STRAPI_BASE_URL + '/content-type-builder/content-types';
const STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL = STRAPI_CONTENT_TYPE_URL + '/application::';
const STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL = STRAPI_CONTENT_TYPE_URL + '/plugins::';
const STRAPI_CONTENT_TYPE_GET_URL = STRAPI_BASE_URL + '/content-manager/content-types/application::';
const STRAPI_ADMIN_REGISTER = STRAPI_BASE_URL + '/admin/auth/local/register';
const STRAPI_ADMIN_LOGIN = STRAPI_BASE_URL + '/admin/auth/local';
const STRAPI_ADMIN_USERNAME = 'admin';
const STRAPI_ADMIN_PASSWORD = 'capstone';
const STRAPI_ADMIN_EMAIL = 'seanb2016@gmail.com';
const CONTENT_TYPES_SCHEMA_FILE = `${path.resolve(__dirname, 'contentTypes.json')}`;

// Waits until Strapi is reachable while restarting
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

// Format the content type object with the format required for creating and
// updating a content type
const formatContentType = contentType => {
    return {
        "components": [],
        "contentType": contentType
    };
};

// Get the content types from newContentTypes that do not exist in allContentTypes
const getDifference = (allContentTypes, newContentTypes) => {
    return newContentTypes.filter(contentType => {
            let result = true;
            // See if this content type already exists
            for (const currentContentType of allContentTypes) {
                if (_.isEqual(contentType, currentContentType)) {
                    result = false;
                    break;
                }
            }
            return result;
        }
    );
};

// Anonymous method that is directly called to allow for async/await usage
(async () => {
    let loginResponse;

    console.log(`Logging in to Strapi admin panel...`);
    // Register or Login to the admin panel
    try {
        // Attempt to register
        loginResponse = await axios.post(STRAPI_ADMIN_REGISTER, {
            "username": STRAPI_ADMIN_USERNAME,
            "email": STRAPI_ADMIN_EMAIL,
            "password": STRAPI_ADMIN_PASSWORD,
            "passwordConfirmation": STRAPI_ADMIN_PASSWORD
        });
    } catch (error) {
        // If already registered
        if (error.response.status !== 200) {
            // Attempt to login
            try {
                loginResponse = await axios.post(STRAPI_ADMIN_LOGIN, {
                    "identifier": STRAPI_ADMIN_USERNAME,
                    "password": STRAPI_ADMIN_PASSWORD,
                    "rememberMe": false
                });
            } catch (error) {
                console.error(`Error when logging in:\n` + error);
                return;
            }
        }
    }

    // Set the authorization token in the header
    axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.jwt}`;
    console.log(`Login successful!`);

    console.log(`Reading in content type schema fromm file`);
    // Fetch the content type schema from file
    const schema = JSON.parse(fs.readFileSync(CONTENT_TYPES_SCHEMA_FILE, 'utf8'));
    // Get the list of application content types
    let differentApplicationContentTypes = schema.application;
    // Get the list of plugin content types
    let differentPluginsContentTypes = schema.plugins;
    // List of the current existing content types in Strapi
    let existingContentTypes;

    // Add the content type schemas to Strapi
    try {
        console.log(`Fetching all existing content types`);
        // Get all of the current content types on Strapi
        let existingContentTypesResponse = await axios.get(STRAPI_CONTENT_TYPE_URL);
        existingContentTypes = existingContentTypesResponse.data.data.map(t => t.schema);
        // Ensure to remove the 'plugin' key/value that from existing
        // content types because it will cause error when updating
        existingContentTypes.forEach(contentType => {
            Object.keys(contentType.attributes).forEach(t => {
                if(contentType.attributes[t].hasOwnProperty('plugin')){
                    delete contentType.attributes[t]['plugin'];
                }
            });
        });
        // Get the application content types that need to be created or updated
        differentApplicationContentTypes = getDifference(existingContentTypes, differentApplicationContentTypes);
        // Get the plugin content types that need to be created or updated
        differentPluginsContentTypes = getDifference(existingContentTypes, differentPluginsContentTypes);

        console.log(`Checking which content types need to be created`);
        // Check to see which content types need to be created
        const contentTypeToCreate = [];
        const contentTypeToUpdate = [];
        for (const contentType of differentApplicationContentTypes) {
            const url = STRAPI_CONTENT_TYPE_GET_URL + contentType.name + '.' + contentType.name;
            const response = await axios.get(url).catch(e => e);
            // If request returned error, the content type needs to be created,
            // otherwise, updated
            if (response instanceof Error) {
                contentTypeToCreate.push(contentType);
            } else {
                contentTypeToUpdate.push(contentType);
            }
        }

        // For the content types that need to be created, shallow create them
        // so that that can be referenced by other content types upon creation
        for (const contentType of contentTypeToCreate) {
            const payload = formatContentType({
                "name": contentType.name,
                "attributes": {
                    "dummyAttribute": {
                        "type": "string"
                    }
                }
            });
            console.log(`\tCreating dummy ${contentType.name}`);
            await axios.post(STRAPI_CONTENT_TYPE_URL, payload);
            await awaitRestart();
        }
        console.log(`Done creating new content types`);

        console.log(`Updating content types`);
        // Update the plugin content types
        for (const contentType of differentPluginsContentTypes) {
            const url = STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL + contentType.collectionName.replace('_', '.');
            const payload = formatContentType(contentType);
            console.log(`\tUpdating ${contentType.name}`);
            await axios.put(url, payload);
            await awaitRestart();
        }

        // Add the content types that were created to be updated
        contentTypeToUpdate.push(...contentTypeToCreate);
        // Update the application (user defined) content types
        for (const contentType of contentTypeToUpdate) {
            const url = STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + contentType.name + '.' + contentType.name;
            const payload = formatContentType(contentType);
            console.log(`\tUpdating ${contentType.name}`);
            await axios.put(url, payload);
            await awaitRestart();
        }
        console.log(`Finished updating content types`);

        console.log(`Schema import successful!`);
    } catch (error) {
        const key = Object.keys(error.response.data.error)[0];
        const value = error.response.data.error[key][0];
        console.error(`${error}\n${value}`);
    }
})();
