import axios from 'axios';
import Endpoint from './Endpoint';
import UploadEndpoint from './UploadEndpoint';

// Handles all axios request interception
const handleRequest = (config) => {
  const token = localStorage.getItem('id_token');
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
  if(response.status === 401){
    localStorage.clear();
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

  // Other non-content type Strapi API endpoints

  uploads: new UploadEndpoint(axios),

  // Other API endpoint methods

  getRoles: () => axios.get('/users-permissions/roles'),
  login: (identifier, password) =>
    axios.post('/auth/local', {
      identifier,
      password
    }),
  register: (user) =>
    axios.post('/auth/local/register', user)
};

export default API;
