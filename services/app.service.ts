import { SERVER_URL } from "@/lib/constants/SettingSystem";
import axios, { type Method } from "axios";
import Cookies from "js-cookie"

axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = Cookies.get("accessToken") ? `Bearer ${Cookies.get("accessToken")}` : '';
    return config;
});

class AppService {
    private async request(method: Method, url: string, data?: object | string, options?: object) {
        const requestConfig = {
            ...options,
            data,
        };
        const requestUrl = `${SERVER_URL}${url}`;
        return axios.request({
            method,
            url: requestUrl,
            ...requestConfig,
            withCredentials: true
        });
    }

    get(url: string, data?: object | string, params?: object) {
        return this.request('get', url, data, { params });
    }

    post(url: string, data?: object | string) {
        return this.request('post', url, data);
    }

    put(url: string, data?: object | string) {
        return this.request('put', url, data);
    }

    patch(url: string, data?: object | string) {
        return this.request('patch', url, data);
    }

    delete(url: string, data?: object | string) {
        return this.request('delete', url, data);
    }
}

export default AppService;