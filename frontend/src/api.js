import axios from 'axios';

// This is the bridge to your backend
const API = axios.create({
    baseURL: 'http://localhost:5000',
});

export default API;