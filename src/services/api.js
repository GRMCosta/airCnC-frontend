import axios from 'axios';


const api = axios.create({
    baseURL: process.env.REACT_APP_REST_API_LOCATION,
    withCredentials: false,
    headers: {
    'Access-Control-Allow-Origin' : 'https://aircncprod.herokuapp.com/',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

export default api;
