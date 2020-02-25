/*
Filename: constants.js
Contributors:
Parker Wagner - Initially created the file and extracted things that should have been constants.
Stephen Tate - added the school colors and homepageBackground functionality
 */

import Strapi from 'strapi-sdk-javascript/build/main';

export const strapiURL = "http://localhost:1337";
export const strapi = new Strapi(strapiURL);

export const userImport = {
    requiredFields: ['Fullname', 'email', 'username', 'role'],
    optionalFields: ['password', 'Description', 'confirmed']
};

//Put the name of your university here
export const university = "Baylor";

//These colors make up the theme of the website. Use a site like https://www.hexcolortool.com/ to find your school's colors in hex
export const schoolColorPrimary = '#003015';
export const schoolColorSecondary = '#fecb00';

export const homepageBackground = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Baylor_University_June_2016_19_%28Founders_Mall_and_Pat_Neff_Hall%29.jpg';
