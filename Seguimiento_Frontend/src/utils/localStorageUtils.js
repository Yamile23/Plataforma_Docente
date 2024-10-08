export const setLocalStorage = (key, value, json = false) => {
    if (json) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}
export const getLocalStorage = (key, json = false) => {
    if (json) {
        const val = localStorage.getItem(key);
        if (!val) {
            return null;
        }
        return JSON.parse(localStorage.getItem(key));
    } else {
        return localStorage.getItem(key);
    }
}
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}