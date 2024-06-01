"use client";

import axios from "axios";
import Cookies from "js-cookie";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
const VN_PROVINCES = process.env.NEXT_PUBLIC_VIETNAM_PROVINCES_URL;


const publicApi = axios.create({
    baseURL: SERVER,
});

const authApi = axios.create({
    baseURL: SERVER,
    headers: {
        "Authorization": "Bearer " + Cookies.get("accessToken")
    },
});

const vnProvincesApi = axios.create({
    baseURL: VN_PROVINCES,
});

export { publicApi, authApi, vnProvincesApi };
