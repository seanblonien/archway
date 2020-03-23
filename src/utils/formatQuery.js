/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
const formatQuery = (params) => `?${Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&')}`;

export default formatQuery;
