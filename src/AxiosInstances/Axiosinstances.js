import axios from 'axios';

// axios global settings
const API_BASE_URL = "http://localhost:8081/api/v1/";
const TIMEOUT = 15000

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT
})