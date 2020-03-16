// Returns the first n words from the string
import {strapi, strapiURL} from '../constants';

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

/* eslint-disable no-bitwise */
export const transformUserFields = async (user) => {
  const {data: {roles}} = await strapi.axios.get(`${strapiURL}/users-permissions/roles`);

  const [role] = roles.filter(r => r.name === user.role).map(r => r.id);
  user.role = role;

  const p = [...Array(6)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
  if (!user.password) user.password = p;
};
