// lib/axiosClient.js

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;
