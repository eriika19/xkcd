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
    if (res.response.status === 404) {
      alert('Este cómic todavía no existe');
    }
    return res;
  },
  // Do something with response error
  err => {
    if (err.response.status === 404) {
      alert('Este cómic todavía no existe');
    }
    return err;
  },
);

export default axiosInstance;
