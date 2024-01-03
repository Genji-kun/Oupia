import axios from "axios";
import { cookies } from "next/headers";

const SERVER = "http://localhost:8080/api/";

const publicApi = axios.create({
    baseURL: SERVER,
});

const authApi = axios.create({
    baseURL: SERVER,
    headers: {
        "Authorization": typeof window !== 'undefined' ? document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") : "",
    },
});

export { publicApi, authApi };
