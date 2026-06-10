const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user'
};

export const storageService = {
    getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
    setToken: (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
    removeToken: () => localStorage.removeItem(STORAGE_KEYS.TOKEN),

    getUser: () => {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    },
    setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
    removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

    clearAll: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }
};