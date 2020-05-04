import axios from 'axios';
import StorageManager from '../Contexts/StorageManager';
import Endpoint from './Endpoint';
import UploadEndpoint from './UploadEndpoint';

// Handles all axios request interception
const handleRequest = (config) => {
  const token = StorageManager.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Handles all axios request errors
const handleRequestError = (error) => Promise.reject(error);

// Handles all axios response interception
const handleResponse = (response) => response;

// Handles all axios response errors
const handleResponseError = async (error) => {
  const {response} = error;
  // 401 means bad token/bad authentication values
  if(response.status === 401){
    StorageManager.clearLocalStorage();
    window.location.reload();
    return Promise.resolve();
  }
  return Promise.reject(response);
};

// Set defaults
axios.defaults.baseURL = 'http://localhost:1337'; // TODO environment variable

// RESPONSE interceptor
axios.interceptors.request.use(handleRequest, handleRequestError);

// RESPONSE interceptor
axios.interceptors.response.use(handleResponse, handleResponseError);

// Export all of the accessible API methods
const API = {
  // Manual exporting content types to provide static type usage
  // Content types *must* be lowercase

  capstones: new Endpoint('capstones', axios),
  departments: new Endpoint('departments', axios),
  sponsors: new Endpoint('sponsors', axios),
  faqs: new Endpoint('faqs', axios),
  proposals: new Endpoint('proposals', axios),
  users:  new Endpoint('users', axios),
  theme: new Endpoint('theme', axios),
  homepage: new Endpoint('home-page', axios),
  sponsorpage: new Endpoint('sponsor-page', axios),
  aboutpage: new Endpoint('about-page', axios),
  headerfooter: new Endpoint('header-footer', axios),

  // Other non-content type Strapi API endpoints

  uploads: new UploadEndpoint(axios),

  // Other API endpoint methods

  getRoles: () => axios.get('/users-permissions/roles'),
  getRole: (id) => axios.get(`/users-permissions/roles/${id}`),
  getRoleNameFromID: async (id) => {
    const {data: {roles}} = await API.getRoles();
    const roleIDToName = roles.reduce((map, role) => {
      map[role.id] = role.name;
      return map;
    }, {});
    return roleIDToName[id];
  },
  getRoleIDFromName: async (roleName) => {
    const {data: {roles}} = await API.getRoles();
    const roleNameToID = roles.reduce((map, role) => {
      map[role.name] = role.id;
      return map;
    }, {});
    return roleNameToID[roleName];
  },
  login: (identifier, password) =>
    axios.post('/auth/local', {
      identifier,
      password
    }),
  signUp: (user) =>
    axios.post('/auth/local/register', user),
  forgotPassword: (email) => axios.post('/auth/forgot-password', {email}),
  authenticate: () => axios.get('/posts'),
  resetPassword: (code, password, passwordConfirmation) => axios.post('/auth/reset-password',
    {code, password, passwordConfirmation})
};

export default API;
