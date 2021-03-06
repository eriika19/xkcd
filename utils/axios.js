import axios from 'axios';
import { API_BASE_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  // Do something with response data
  res => {
    return res;
  },
  // Do something with response error
  err => {
    return err;
  },
);

export default axiosInstance;
