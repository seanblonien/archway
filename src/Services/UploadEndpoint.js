import formatQuery from '../utils/formatQuery';

// Represents the Strapi upload endpoint
export default class UploadEndpoint {
  constructor (apiClient) {
    this.name = 'upload';
    this.apiClient = apiClient;
  }

  // Finds all matching uploads according to the query.
  // By default, all uploads are returned.
  find = async (query={}) => (await this.apiClient.get(`${this.name}/files/${formatQuery(query)}`)).data;

  // Finds an upload by its id.
  findOne = async (id) => (await this.apiClient.get(`${this.name}/files/${id}`)).data;

  // Uploads a new upload file.
  upload = (upload) => this.apiClient.post(`${this.name}/`, upload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  // Deletes an upload by its id.
  delete = (id) => {
    this.apiClient.delete(`${this.name}/files/${id}`);
  };
}
