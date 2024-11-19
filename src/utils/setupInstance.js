import axios from 'axios';

const APP_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api/v1/';

const instance = axios.create({
  baseURL: APP_URL,
});

export default instance;