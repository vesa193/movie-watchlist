export const useLocalStorage = () => {
    const getItem = (key: string) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };

    const setItem = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeItem = (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from localStorage:', error);
        }
    };

    const clear = () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    };

    return { getItem, setItem, removeItem, clear };
};
