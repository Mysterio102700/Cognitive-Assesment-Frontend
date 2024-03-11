import axios from "axios";

const API_BASE_URL = "http://localhost:8000";


axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const AxiosInstances = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});