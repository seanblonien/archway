const s = require('./strapi-scripts');
const ARGV_INDEX_FILE_PATH = 2;
const ARGV_REQUIRED_LENGTH = 3;

// Anonymous method that is directly called to allow for async/await usage
(async () => {
    // Get the export filename to use
    if(process.argv.length < ARGV_REQUIRED_LENGTH){
        console.error(`Please provide a filename for strapi export.`);
        return;
    }
    const fileName = process.argv[ARGV_INDEX_FILE_PATH];

    console.log(`Logging in to Strapi admin panel...`);
    await s.authenticate();
    console.log(`Login successful!`);

    console.log(`Fetching all existing content types`);
    let serverContentTypesResponse = await s.axios.get(s.STRAPI_CONTENT_TYPE_URL);
    // List of the content types on the Strapi server
    let serverContentTypes = serverContentTypesResponse.data.data.map(t => t.schema);
    // Remove 'plugin' attribute that cause errors
    s.removePluginAttribute(serverContentTypes);
    // Split the content types into 'application' and 'plugins'
    let serverContentTypesPlugins= serverContentTypes.filter(contentType => contentType.collectionName.startsWith('users-permissions'));
    let serverContentTypesApplication = serverContentTypes.filter(contentType => !contentType.collectionName.startsWith('users-permissions'));

    // Put the application and plugins content types in a json object
    let output = {
        "application": serverContentTypesApplication,
        "plugins": serverContentTypesPlugins
    };

    // Write that json object to file
    console.log(`Exporting content types to file`);
    s.writeJSONToFile(fileName, output);

    console.log(`Done!`);
})();
