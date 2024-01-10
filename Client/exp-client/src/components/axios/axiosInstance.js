
import axios from 'axios'
const BASE_URL = "http://localhost:5000/"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true ,
});

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = token;
    return config;
  });

export default axiosInstance;