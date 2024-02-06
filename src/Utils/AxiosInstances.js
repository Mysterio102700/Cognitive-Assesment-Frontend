import axios from "axios";

const API_BASE_URL = "http://localhost:8000";
const token = localStorage.getItem("token");


axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
// axios.interceptors.request.use(function(config){
//   config.headers.Authorization = token ? `Bearer ${token}`: '';
//   return config;
// })
export const AxiosInstances = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});