import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        localStorage.removeItem('token');
        console.log("Saving token "+newToken);
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}