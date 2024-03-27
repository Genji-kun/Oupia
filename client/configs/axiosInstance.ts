"use client";

import axios from "axios";
import cookies from "react-cookies";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;


const publicApi = axios.create({
    baseURL: SERVER,
});

const authApi = axios.create({
    baseURL: SERVER,
    headers: {
        "Authorization": "Bearer " + cookies.load("accessToken")
    },
});

export { publicApi, authApi };
