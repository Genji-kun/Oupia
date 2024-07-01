import axios from "axios";
import { SERVER_URL, VN_PROVINCES } from "../constants/SettingSystem";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {

    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config;
})


export const vnProvincesApi = axios.create({
    baseURL: VN_PROVINCES,
});