import { SERVER_URL } from "@/lib/constants/SettingSystem";
import axios, { type Method } from "axios";

axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = localStorage.getItem("accessToken") ? `Bearer ${localStorage.getItem("accessToken")}` : '';
    return config;
});

class BaseService {
    private async request(method: Method, url: string, data?: object | string, customHeaders?: object) {
        const requestConfig = { headers: customHeaders, data };
        const requestUrl = `${SERVER_URL}${url}`;
        return axios.request({
            method,
            url: requestUrl,
            ...requestConfig,
            withCredentials: true
        });
    }

    get(url: string, data?: object | string) {
        return this.request('get', url, data);
    }

    post(url: string, data?: object | string) {
        return this.request('post', url, data);
    }

    put(url: string, data?: object | string) {
        return this.request('put', url, data);
    }

    delete(url: string, data?: object | string) {
        return this.request('delete', url, data);
    }
}

export default BaseService;