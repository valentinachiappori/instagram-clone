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
    
    setUser: (user) => {
        if (!user) return;
        const safeUser = {
            id: user.id,
            name: user.name,
            image: user.image,
            email: user.email
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser));
    },
    
    removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

    clearAll: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }
};