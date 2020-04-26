import perms from './utils/AccessControl/permissions.json';

export const strapiURL = 'http://localhost:1337';

export const USER_IMPORT_TYPE = {
  'none': 0,
  'file': 1,
  'text': 2,
  'manual': 3
};

// Object of strapi user permissions
export const permissions = perms;
