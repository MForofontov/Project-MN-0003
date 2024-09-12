import { callAPI } from './api';

export const LogOutAPI = async () => {
    try {
        await callAPI({
            method: 'POST',
            url: '/logout/',
        });
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export default LogOutAPI;