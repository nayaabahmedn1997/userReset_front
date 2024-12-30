import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:"http://localhost:8000/api/users"
});

export default axiosInstance;