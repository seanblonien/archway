const axios = require('axios').default;
const fs = require('fs');
const path = require('path');

const STRAPI_BASE_URL = 'http://localhost:1337';
const STRAPI_CONTENT_TYPE_CREATE_URL = STRAPI_BASE_URL + '/content-type-builder/content-types';
const STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL = STRAPI_BASE_URL + '/content-type-builder/content-types/application::';
const STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL = STRAPI_BASE_URL + '/content-type-builder/content-types/plugins::';
const STRAPI_CONTENT_TYPE_GET_URL = STRAPI_BASE_URL + '/content-manager/content-types/application::';
const STRAPI_ADMIN_REGISTER = STRAPI_BASE_URL + '/admin/auth/local/register';
const STRAPI_ADMIN_LOGIN = STRAPI_BASE_URL + '/admin/auth/local';
const STRAPI_ADMIN_USERNAME = 'admin';
const STRAPI_ADMIN_PASSWORD = 'capstone';
const STRAPI_ADMIN_EMAIL = 'seanb2016@gmail.com';
const CONTENT_TYPES_SCHEMA_FILE = `${path.resolve(__dirname, 'contentTypes.json')}`;

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

const formatContentType = contentType => {
    return {
        "components": [],
        "contentType": contentType
    };
};

(async () => {
    let response;

    // Register or Login to the admin panel
    try {
        // Attempt to register
        response = await axios.post(STRAPI_ADMIN_REGISTER, {
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
                response = await axios.post(STRAPI_ADMIN_LOGIN, {
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;

    // Fetch the content type schema from file
    const contentTypes = JSON.parse(fs.readFileSync(CONTENT_TYPES_SCHEMA_FILE, 'utf8'));
    // Get the list of application content types
    const applicationContentTypes = contentTypes.application;
    // Get the list of plugin content types
    const pluginsContentTypes = contentTypes.plugins;

    // Add the content type schemas to Strapi
    try {
        // Check to see which content types need to be created
        const contentTypeToCreate = [];
        for (const contentType of applicationContentTypes) {
            const url = STRAPI_CONTENT_TYPE_GET_URL + contentType.name + '.' + contentType.name;
            const response = await axios.get(url).catch(e => e);
            // If request returned error, the content type needs to be created
            if (response instanceof Error) {
                contentTypeToCreate.push(contentType);
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
            await axios.post(STRAPI_CONTENT_TYPE_CREATE_URL, payload);
            await awaitRestart();
        }

        // Update the plugin content types
        for (const contentType of pluginsContentTypes) {
            const url = STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL + contentType.collectionName.replace('_', '.');
            const payload = formatContentType(contentType);
            await axios.put(url, payload);
            await awaitRestart();
        }

        // Update the application (user defined) content types
        for (const contentType of applicationContentTypes) {
            const url = STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + contentType.name + '.' + contentType.name;
            const payload = formatContentType(contentType);
            await axios.put(url, payload);
            await awaitRestart();
        }
    } catch (error) {
        console.error(`Error when creating and updating content types:\n` + error);
    }
})();
