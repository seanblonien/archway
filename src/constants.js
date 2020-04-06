import perms from './utils/AccessControl/permissions.json';

export const strapiURL = 'http://localhost:1337';

export const userImport = {
  fields: [
    {
      name: 'Fullname',
      label: 'Full Name',
      validation: '',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      validation: '',
      required: true
    },
    {
      name: 'username',
      label: 'Username',
      validation: '',
      required: true
    },
    {
      name: 'role',
      label: 'Role',
      validation: '',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      validation: '',
      required: false
    },
    {
      name: 'description',
      label: 'Description',
      validation: '',
      required: false
    },
    {
      name: 'confirmed',
      label: 'Confirmed',
      validation: '',
      required: false
    }
  ]
};

export const USER_IMPORT_TYPE = {
  'none': 0,
  'file': 1,
  'text': 2,
  'manual': 3
};

// Object of strapi user permissions
export const permissions = perms;