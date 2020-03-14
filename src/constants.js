import Strapi from 'strapi-sdk-javascript/build/main';

export const strapiURL = 'http://localhost:1337';
export const strapi = new Strapi(strapiURL);

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
      name: 'Description',
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

// Put the name of your university here
export const university = 'Baylor';

// These colors make up the theme of the website. Use a site like https://www.hexcolortool.com/ to find your school's colors in hex
export const schoolColorPrimary = '#154734';
export const schoolColorSecondary = '#FFB81C';

export const homepageBackground = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Baylor_University_June_2016_19_%28Founders_Mall_and_Pat_Neff_Hall%29.jpg';
