import axios from 'axios';

import API_BASE_URL from './HostConfig';
const programUrl = `${API_BASE_URL}/programs`;
import { addAuthHeaders } from '../LoginService'; // Import addAuthHeaders
const headers = addAuthHeaders();

const ProgramService = {
  addProgram: async (programData) => {
    const response = await axios.post(`${programUrl}/create`, programData, { headers });
    return response.data;
  },

  fetchAllPrograms: async () => {
    const response = await axios.get(`${programUrl}/`, { headers });
    return response.data;
  },

};

 

export default ProgramService;
