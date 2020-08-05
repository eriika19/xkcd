import axios from 'axios';
import { API_BASE_URL_START } from './constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL_START,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  // Do something with response data
  res => {
    console.log('====================================');
    console.log('res: ', res);
    console.log('====================================');
    return res;
  },
  // Do something with response error
  err => {
    if (err.status === 404) {
      alert('Este cómic todavía no existe');
    }
    console.log(err);
    return err;
  },
);

export default axiosInstance;
