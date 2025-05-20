// TimeService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/timeslots/';

class TimeService {
  getAll() {
    return axios.get(API_URL);
  }

  getById(id) {
    return axios.get(`${API_URL}${id}/`);
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  bulkCreate(data) {
    return axios.post(`${API_URL}bulk_create/`, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}${id}/`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}${id}/`);
  }
}

export default new TimeService();