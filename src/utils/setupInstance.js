import axios from 'axios';

const APP_URL = process.env.REACT_APP_BASE_URL 
|| 'https://hire-wire-859928566841.northamerica-northeast2.run.app/api/v1/';

const instance = axios.create({
  baseURL: APP_URL,
});

export default instance;