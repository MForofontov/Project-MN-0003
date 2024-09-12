// src/services/auth.ts
import { callAPI } from './api';

export const isAuthenticatedAPI = async (): Promise<boolean> => {
    try {
        // Make a request to a protected endpoint to check if the user is authenticated
        await callAPI({
            method: 'GET',
            url: '/status/',
        })
        return true;
    } catch (error) {
        return false;
    }
};