import {formatQuery} from '../utils/utils';

// Represents a Strapi content type's endpoint
export default class Endpoint {
  constructor(name, apiClient) {
    this.name = name;
    this.apiClient = apiClient;
  }

  // Finds all matching entries according to the query for this endpoint.
  // By default, all entries are returned.
  find = async (query={}) => (await this.apiClient.get(`${this.name}/${formatQuery(query)}`)).data;

  // Finds an entry by its id.
  findOne = async (id) => (await this.apiClient.get(`${this.name}/${id}`)).data;

  // Returns the number of entries for this endpoint.
  count = () => this.apiClient.get(`${this.name}/count`);

  // Creates a new entry for this endpoint.
  create = (data) => this.apiClient.post(this.name, data);

  // Updates an entry using its id for this endpoint.
  update = (id, data) => this.apiClient.put(`${this.name}/${id}`, data);

  // Updates a single type entry for this endpoint.
  updateOne = (data) => this.apiClient.put(`${this.name}`, data);

  // Deletes an entry using its id for this endpoint.
  delete = (id) => this.apiClient.delete(`${this.name}/${id}`);
}
