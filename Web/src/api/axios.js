import axios from "axios";
import { storageService } from "./storageService";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
    const token = storageService.getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            storageService.clearAll();
        }
        return Promise.reject(error);
    }
);

export default api;