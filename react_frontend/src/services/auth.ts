// src/services/auth.ts
import { callUserManagementAPI } from './api';

export const isAuthenticatedAPI = async (): Promise<boolean> => {
  try {
    // Make a request to a protected endpoint to check if the user is authenticated
    await callUserManagementAPI({
      method: 'get', // Use lowercase for the HTTP method
      url: '/status/',
    });
    return true; // Return true if the request is successful
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false; // Return false if the request fails
  }
};