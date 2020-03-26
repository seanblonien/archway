/**
 * Script that updates the static permission files.
 */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const s = require('./strapi-scripts');

const PATH_TO_ACCESS_CONTROL = './../src/utils/AccessControl/';

const _ = (str) => str.replace(/-/g, '_');

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
    // Stores all of the unique permission names
    const permNames = [];
    // Stores all of the unique role names
    const roleNames = [];
    // Tracks whether or not all permissions have been seen
    let readAllPermissions = false;

    // For each role with permissions
    for(const role of roleWithPerm){
      // Save the unique role name
      roleNames.push(role.name);

      // If not read all permissions already
      if(!readAllPermissions){
        // For each permission plugin
        for(const [permPluginKey] of Object.entries(role.permissions)) {
          // Map the value to the controller values (other info is useless)
          role.permissions[permPluginKey] = role.permissions[permPluginKey].controllers;

          // If the plugin key has not yet been seen, initialize the object
          if(!perms[_(permPluginKey)]) perms[_(permPluginKey)] = {};

          // For each permission group
          for(const [permGroupKey, permGroupValue] of Object.entries(role.permissions[permPluginKey])){
            // If the group key has not yet been seen, initialize the object
            if(!perms[_(permPluginKey)][_(permGroupKey)]) perms[_(permPluginKey)][_(permGroupKey)] = {};

            // For each permission
            for(const [permKey] of Object.entries(permGroupValue)){
              // Derive a unique permission name from the keys
              const permName = `${permPluginKey}.${permGroupKey}.${permKey}`;
              // Save the unique permission name
              permNames.push(permName);

              // If the permission key has not yet been seen, initialize it
              if(!perms[_(permPluginKey)][_(permGroupKey)][_(permKey)]) {
                perms[_(permPluginKey)][_(permGroupKey)][_(permKey)] = permName;
              } else {
                // Otherwise all permission values have been read
                readAllPermissions = true;
              }
            }
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
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}permissionValues.json`, permNames);
    s.writeJSONToFile(`${PATH_TO_ACCESS_CONTROL}rolesValues.json`, roleNames);
    console.log('Permissions updated successfully!');
  } catch(e){
    console.error(e);
  }
})();
