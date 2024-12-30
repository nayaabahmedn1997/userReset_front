import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:"https://userreset-back.onrender.com/api/users"
});

export default axiosInstance;