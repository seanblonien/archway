/**
 * Script that updates the static permission files.
 */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const s = require('./strapi-scripts');

const PATH_TO_ACCESS_CONTROL = './../src/utils/AccessControl/';

// Anonymous method that is directly called to allow for async/await usage
(async () => {
  try {
    console.log('Logging in to Strapi admin panel...');
    await s.authenticate();

    console.log('Fetching roles and permissions');
    // Get a list of all roles
    const result = await s.getRoles();
    // For each role, get the roles permissions
    const rolePromises = result.data.roles.map(role => s.getRole(role.id));
    const rolesResults = await Promise.all(rolePromises);
    // Map the responses to an array of roles with permissions
    const roleWithPerm = rolesResults.map(role => role.data.role);

    console.log('Parsing roles and permissions');
    // Object to store the permissions with their key values
    const perms = {};
    // Object to store the roles with their key values
    const roles = {};
    // Object to store the roles with their permission values (i.e. true/false)
    const rolesAndPerms = {};
    // Stores all of the unique permission names
    const permNames = [];
    // Stores all of the unique role names
    const roleNames = [];

    // For each role with permissions
    for(const role of roleWithPerm){
      // Create the role as a property with blank value
      rolesAndPerms[role.name] = {};
      // Save the unique role name
      roleNames.push(role.name);

      // For each permission plugin
      for(const [permPluginKey] of Object.entries(role.permissions)) {
        // Map the value to the controller values (other info is useless)
        role.permissions[permPluginKey] = role.permissions[permPluginKey].controllers;

        // If the plugin key has not yet been seen, initialize the object
        if(!perms[permPluginKey]) perms[permPluginKey] = {};

        // For each permission group
        for(const [permGroupKey, permGroupValue] of Object.entries(role.permissions[permPluginKey])){
          // If the group key has not yet been seen, initialize the object
          if(!perms[permPluginKey][permGroupKey]) perms[permPluginKey][permGroupKey] = {};

          // For each permission
          for(const [permKey, permValue] of Object.entries(permGroupValue)){
            // Derive a unique permission name from the keys
            const permName = permPluginKey + permGroupKey + permKey;
            // Save the unique permission name
            permNames.push(permName);

            // If the permission key has not yet been seen, initialize it
            if(!perms[permPluginKey][permGroupKey][permKey]) {
              perms[permPluginKey][permGroupKey][permKey] = permName;
            }

            // Set the according permission value for the given role at the
            // given permission name (the actual true/false value)
            rolesAndPerms[role.name][permName] = permValue.enabled;
          }
        }
      }
    }

    // Derives the key/value pair for roles
    roleNames.reduce((obj, r) => {
      obj[r] = r;
      return obj;
    }, roles);

    // Write the values to file
    console.log('Writing roles and permissions to file');
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}permissions.json`, perms);
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}roles.json`, roles);
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}rolesAndPermissions.json`, rolesAndPerms);
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}permissionValues.json`, permNames);
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}roleValues.json`, roleNames);
    console.log('Permissions updated successfully!');
  } catch(e){
    console.error(e);
  }
})();
