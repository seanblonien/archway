/**
 * Script that imports Strapi content type schemas from a local JSON file
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
/* eslint-disable no-console, no-await-in-loop */
const _ = require('lodash');
const s = require('./strapi-scripts');

const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  // Get the import filename to use
  if(process.argv.length < ARGV_REQUIRED_LENGTH) {
    console.error('Please provide a filename for the strapi import.');
    process.exit(s.errCode);
  }
  const fileName = process.argv[ARGV_INDEX_FILE_PATH];

  // Authenticate with Strapi
  console.log('Logging in to Strapi admin panel...');
  await s.authenticate();
  console.log('Login successful!');

  // Read in the content type schema
  console.log('Reading in content type schema fromm file');
  const schema = JSON.parse(s.readJSONFromFile(fileName));
  // Get the list of application content types
  const applicationContentTypes = schema.application;
  // Get the list of plugin content types
  const pluginsContentTypes = schema.plugins;
  // All content types
  const localContentTypes = [...applicationContentTypes, ...pluginsContentTypes];
  // Remove 'plugin' attribute that cause errors
  s.removePluginAttribute(localContentTypes);
  // Verify local content types are not capitalized
  const capitalized = localContentTypes.filter(contentType => contentType.name !== contentType.name.toLowerCase());
  if(!_.isEmpty(capitalized)) {
    console.error('Content types cannot have capital letters in Strapi!');
    console.error(`See: ${capitalized.map(c => c.name)}`);
    process.exit(s.errCode);
  }

  // Add the content type schemas to Strapi
  try {
    console.log('Fetching all existing content types');
    // Fetch all of the current content types on the Strapi server
    const serverContentTypesResponse = await s.axios.get(s.STRAPI_CONTENT_TYPE_URL);
    // List of the content types on the Strapi server
    const serverContentTypes = serverContentTypesResponse.data.data.map(t => t.schema);
    // Remove 'plugin' attribute that cause errors
    s.removePluginAttribute(serverContentTypes);

    // Find the content types to delete
    const contentTypeNamesToDelete = _.differenceWith(serverContentTypes.map(serverType => serverType.name), localContentTypes.map(localType => localType.name), _.isEqual);
    // Find the application content types that need to be created or updated
    const applicationContentTypesToUpdate = _.differenceWith(applicationContentTypes, serverContentTypes, _.isEqual);
    // Find the the plugin content types that need to be created or updated
    const pluginsContentTypesToUpdate = _.differenceWith(pluginsContentTypes, serverContentTypes, _.isEqual);

    console.log('Checking which content types need to be created');
    // Check to see which content types need to be created
    const contentTypesPromises = applicationContentTypesToUpdate.map(contentType => {
      const name = contentType.name.replace(' ', '-');
      return s.axios.get(`${s.STRAPI_CONTENT_TYPE_GET_URL + name}.${name}`).catch(e => ({...e, contentType}));
    });
    const contentTypesResponses = await Promise.all(contentTypesPromises);
    // If request returned error, the content type needs to be created,
    // otherwise, updated
    const contentTypeToCreate = contentTypesResponses.filter(response => response.isAxiosError).map(contentType => contentType.contentType);
    const contentTypeToUpdate = _.differenceWith(applicationContentTypesToUpdate, contentTypeToCreate, _.isEqual);

    // For the content types that need to be created, shallow create them
    // so that that can be referenced by other content types upon creation
    for (const contentType of contentTypeToCreate) {
      const payload = s.formatContentType({
        'name': contentType.name,
        'attributes': {
          'dummyAttribute': {
            'type': 'string'
          }
        }
      });
      console.log(`\tCreating dummy ${contentType.name}`);
      await s.axios.post(s.STRAPI_CONTENT_TYPE_URL, payload);
      await s.awaitRestart();
    }
    console.log('Done creating new content types');

    console.log('Updating content types');
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
      const name = contentType.name.replace(' ', '-');
      const url = `${s.STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + name}.${name}`;
      const payload = s.formatContentType(contentType);
      console.log(`\tUpdating ${contentType.name}`);
      await s.axios.put(url, payload);
      await s.awaitRestart();
    }

    // Delete any content types not specified locally
    // Check to see which content types need to be created
    const contentTypesToDeletePromises = contentTypeNamesToDelete.map(contentType =>
      s.axios.get(`${s.STRAPI_CONTENT_TYPE_GET_URL + 
                          contentType.replace(' ', '-')}.
                          ${contentType.replace(' ', '-')}`)
        .catch(e => ({...e, contentType}))
    );
    const contentTypesToDeleteResponse = await Promise.all(contentTypesToDeletePromises);
    const contentTypesToDelete = contentTypesToDeleteResponse.filter(r => r.response.status === 200);
    for(const name of contentTypesToDelete) {
      const url = `${s.STRAPI_CONTENT_TYPE_UPDATE_APPLICATION_URL + name}.${name}`;
      console.log(`\tDeleting ${name}`);
      await s.axios.delete(url);
      await s.awaitRestart();
    }
    console.log('Finished updating content types');
  } catch (error) {
    if(error.response && error.response.data.error){
      const key = Object.keys(error.response.data.error)[0];
      const value = error.response.data.error[key][0];
      console.error(`${error}\n${value}`);
    } else {
      console.error(error);
    }
    console.error('Error importing Strapi schema.');
    process.exit(s.errCode);
  }

  console.log('\nStrapi schema import successful!');
  process.exit(s.successCode);
})();
