// axiosClient.ts
import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const axiosClient: AxiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: gắn token tự động
axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
