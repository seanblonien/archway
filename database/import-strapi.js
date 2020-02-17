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
const s = require('./strapi-scripts.js');
const _ = require('lodash');
const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
    // Get the import filename to use
    if(process.argv.length < ARGV_REQUIRED_LENGTH){
        console.error(`Please provide a filename for the strapi import.`);
        return;
    }
    const fileName = process.argv[ARGV_INDEX_FILE_PATH];

    // Authenticate with Strapi
    console.log(`Logging in to Strapi admin panel...`);
    await s.authenticate();
    console.log(`Login successful!`);

    // Read in the content type schema
    console.log(`Reading in content type schema fromm file`);
    const schema = JSON.parse(s.readJSONFromFile(fileName));
    // Get the list of application content types
    let applicationContentTypes = schema.application;
    // Get the list of plugin content types
    let pluginsContentTypes = schema.plugins;
    // All content types
    let localContentTypes = [...applicationContentTypes, ...pluginsContentTypes];
    // Verify local content types are not capitalized
    for(const contentType of localContentTypes){
        if(contentType.name !== contentType.name.toLowerCase()){
            console.error(`Content types cannot have capital letters in Strapi!`);
            console.error(`See: ${contentType.name}`);
            return;
        }
    }

    // Add the content type schemas to Strapi
    try {
        console.log(`Fetching all existing content types`);
        // Fetch all of the current content types on the Strapi server
        let serverContentTypesResponse = await s.axios.get(s.STRAPI_CONTENT_TYPE_URL);
        // List of the content types on the Strapi server
        let serverContentTypes = serverContentTypesResponse.data.data.map(t => t.schema);
        // Ensure to remove the 'plugin' key/value that from server
        // content types because it will cause error when updating
        serverContentTypes.forEach(contentType => {
            Object.keys(contentType.attributes).forEach(t => {
                if(contentType.attributes[t].hasOwnProperty('plugin')){
                    delete contentType.attributes[t]['plugin'];
                }
            });
        });

        // Find the content types to delete
        let contentTypeNamesToDelete = _.differenceWith(serverContentTypes.map(s => s.name), localContentTypes.map(s => s.name), _.isEqual);
        // Find the application content types that need to be created or updated
        let applicationContentTypesToUpdate = _.differenceWith(applicationContentTypes, serverContentTypes, _.isEqual);
        // Find the the plugin content types that need to be created or updated
        let pluginsContentTypesToUpdate = _.differenceWith(pluginsContentTypes, serverContentTypes, _.isEqual);

        console.log(`Checking which content types need to be created`);
        // Check to see which content types need to be created
        const contentTypeToCreate = [];
        const contentTypeToUpdate = [];
        for (const contentType of applicationContentTypesToUpdate) {
            const url = s.STRAPI_CONTENT_TYPE_GET_URL + contentType.name + '.' + contentType.name;
            const response = await s.axios.get(url).catch(e => e);
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
            const payload = s.formatContentType({
                "name": contentType.name,
                "attributes": {
                    "dummyAttribute": {
                        "type": "string"
                    }
                }
            });
            console.log(`\tCreating dummy ${contentType.name}`);
            await s.axios.post(s.STRAPI_CONTENT_TYPE_URL, payload);
            await s.awaitRestart();
        }
        console.log(`Done creating new content types`);

        console.log(`Updating content types`);
        // Update the plugin content types
        for (const contentType of pluginsContentTypesToUpdate) {
            const url = s.STRAPI_CONTENT_TYPE_UPDATE_PLUGIN_URL + contentType.collectionName.replace('_', '.');
            const payload = s.formatContentType(contentType);
            console.log(`\tUpdating ${contentType.name}`);
            await s.axios.put(url, payload);
            await s.awaitRestart();
        }

        // Add the content types that were created to be updated
        contentTypeToUpdate.push(...contentTypeToCreate);
        // Update the application (user defined) content types
        for (const contentType of contentTypeToUpdate) {
            const url = s.STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + contentType.name + '.' + contentType.name;
            const payload = s.formatContentType(contentType);
            console.log(`\tUpdating ${contentType.name}`);
            await s.axios.put(url, payload);
            await s.awaitRestart();
        }

        // Delete any content types not specified locally
        for(const name of contentTypeNamesToDelete){
            const url = s.STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + name + '.' + name;
            console.log(`\tDeleting ${name}`);
            await s.axios.delete(url);
            await s.awaitRestart();
        }
        console.log(`Finished updating content types`);
    } catch (error) {
        const key = Object.keys(error.response.data.error)[0];
        const value = error.response.data.error[key][0];
        console.error(`${error}\n${value}`);
    }

    console.log(`Schema import successful!`);
})();
