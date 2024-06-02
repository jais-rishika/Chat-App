import axios from 'axios';
import { BASE_URL } from '../components/hook-form/config';
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  });

// Add a response interceptor
axios.interceptors.response.use(
    (response)=>response ,
    (error)=> 
        Promise.reject((error.response && error.response.data || "Something went wrong"))
  );

  export default instance;