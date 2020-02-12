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

const getDifference = (allContentTypes, newContentTypes) => {
    return newContentTypes.filter(contentType => {
            let result = true;
            for (const currentContentType of allContentTypes) {
                if (_.isEqual(contentType, currentContentType.schema)) {
                    result = false;
                    break;
                }
            }
            return result;
        }
    );
};


// Runs the script
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
                    "rememberMe": true
                });
            } catch (error) {
                console.error(`Error when logging in:\n` + error);
            }
        }
    }

    // Set the authorization token in the header
    axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.jwt}`;
    console.log(`Login successful!`);

    console.log(`Reading in content type schema fromm file`);
    // Fetch the content type schema from file
    const contentTypes = JSON.parse(fs.readFileSync(CONTENT_TYPES_SCHEMA_FILE, 'utf8'));
    // Get the list of application content types
    let applicationContentTypes = contentTypes.application;
    // Get the list of plugin content types
    let pluginsContentTypes = contentTypes.plugins;
    let existingContentTypes;

    // Add the content type schemas to Strapi
    try {
        console.log(`Fetching all existing content types`);
        // Get all of the current content types on Strapi
        existingContentTypes = (await axios.get(STRAPI_CONTENT_TYPE_URL)).data.data;
        // Get the application content types that need to be created or updated
        applicationContentTypes = getDifference(existingContentTypes, applicationContentTypes);
        // Get the plugins content types that need to be created or updated
        pluginsContentTypes = getDifference(existingContentTypes, pluginsContentTypes);

        console.log(`Checking which content types need to be created`);
        // Check to see which content types need to be created
        const contentTypeToCreate = [];
        const contentTypeToUpdate = [];
        for (const contentType of applicationContentTypes) {
            const url = STRAPI_CONTENT_TYPE_GET_URL + contentType.name + '.' + contentType.name;
            const response = await axios.get(url).catch(e => e);
            // If request returned error, the content type needs to be created
            if (response instanceof Error) {
                contentTypeToCreate.push(contentType);
            } else {
                contentTypeToUpdate.push(contentType);
            }
        }

        // For the content types that need to be created, shallow create them
        // so that that can be referenced by other content types
        for (const contentType of contentTypeToCreate) {
            const key = Object.keys(contentType.attributes)[0];
            const value = contentType.attributes[key];
            const payload = formatContentType({
                "name": contentType.name,
                "attributes": {
                    key: value
                }
            });
            console.log(`\tCreating ${contentType.name}`);
            await axios.post(STRAPI_CONTENT_TYPE_URL, payload);
            await awaitRestart();
        }
        console.log(`Done creating new content types`);

        console.log(`Updating content types`);
        // Update the plugin content types
        for (const contentType of pluginsContentTypes) {
            const url = STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL + contentType.collectionName.replace('_', '.');
            const payload = formatContentType(contentType);
            console.log(`\tUpdating ${contentType.name}`);
            await axios.put(url, payload);
            await awaitRestart();
        }

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
        console.error(`Error when creating and updating content types:\n` + error);
    }
})();
