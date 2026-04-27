import api from "./axios.js";

export const login = (email, password) => {
    return api.post("/login", { email, password });
};

export const register = (name, email, password, image) => {
    return api.post("/register", { name, email, password, image });
};