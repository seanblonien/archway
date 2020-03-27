/* eslint-disable import/no-cycle */
import _ from 'lodash';
import defaultUserImg from '../Static/defaultUser.png';
import {strapiURL} from '../constants';
import defaultCapstoneImg from '../Static/defaultCapstone.svg';
import defaultSponsorImg from '../Static/defaultSponsor.svg';
import defaultDepartmentImg from '../Static/defaultDepartment.svg';
import api from '../Services/api';

// Returns the first n words from the string
export const getFirstNWords = (str, n) => {
  if(str) {
    const str1 = str.split(' ');
    if (str1.length <= n) {
      return str;
    }
    return `${str1.splice(0,n).join(' ')}...`;
  }
  return '';
};

// Returns the image.url value if defined, otherwise, it returns a default
// image
const checkImage = (image, defaultImage) => image && _.get(image, 'url') ?  strapiURL + image.url : defaultImage;

// Object with methods for getting image URL for a Strapi image object.
// If the image is null or does not exist, a corresponding default image is
// returned.
export const imageURL = {
  user: (image) => checkImage(image, defaultUserImg),
  sponsor: (image) => checkImage(image, defaultSponsorImg),
  department: (image) => checkImage(image, defaultDepartmentImg),
  capstone: (image) => checkImage(image, defaultCapstoneImg),
};

export const getImageFromStrapi = (image) => `url(${strapiURL}${image})`;

/* eslint-disable no-bitwise */
export const transformUserFields = async (user) => {
  const {data: {roles}} = await api.getRoles();

  const [role] = roles.filter(r => r.name === user.role).map(r => r.id);
  user.role = role;

  const p = [...Array(6)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
  if (!user.password) user.password = p;
};

/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
export const formatQuery = (params) => `?${Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&')}`;
