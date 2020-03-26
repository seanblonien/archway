import perms from './utils/AccessControl/permissions.json';
import history from './utils/history';

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

// Put the name of your university here
export const university = 'Baylor';

export const Auth0InitOptions = {
  domain: 'archwaycapstone.auth0.com',
  client_id: 'V9OTevHpl8fIrm4ZV8sXbzH1c7CkRtxA',
  redirect_uri: 'http://localhost:80/callback'
};

export const Auth0LogoutReturnTo = window.location.origin;

// A function that routes the user to the right place
// after login
export const Auth0RedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : history.location.pathname
  );
};

// Object of strapi user permissions
export const permissions = perms;

// These colors make up the theme of the website. Use a site like https://www.hexcolortool.com/ to find your school's colors in hex
export const schoolColorPrimary = '#154734';
export const schoolColorSecondary = '#FFB81C';

export const homepageBackground = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Baylor_University_June_2016_19_%28Founders_Mall_and_Pat_Neff_Hall%29.jpg';
